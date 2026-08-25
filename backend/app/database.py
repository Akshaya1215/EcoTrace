import os
import json
import logging
from bson import ObjectId
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
from app.config import settings

logger = logging.getLogger("ecotrace-db")
logging.basicConfig(level=logging.INFO)

# A Mock MongoDB Collection to support JSON Fallback
class MockCollection:
    def __init__(self, name, db_path):
        self.name = name
        self.db_path = db_path
        self._load_data()

    def _load_data(self):
        if os.path.exists(self.db_path):
            try:
                with open(self.db_path, 'r') as f:
                    self.data = json.load(f)
            except Exception as e:
                logger.error(f"Error loading JSON fallback for {self.name}: {e}")
                self.data = []
        else:
            self.data = []
            self._save_data()

    def _save_data(self):
        try:
            os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
            with open(self.db_path, 'w') as f:
                json.dump(self.data, f, indent=2)
        except Exception as e:
            logger.error(f"Error saving JSON fallback for {self.name}: {e}")

    def insert_one(self, doc):
        # Generate string id if not present
        if "_id" not in doc:
            doc["_id"] = str(ObjectId())
        elif isinstance(doc["_id"], ObjectId):
            doc["_id"] = str(doc["_id"])
        
        # Deep copy to avoid mutating original
        new_doc = json.loads(json.dumps(doc))
        self.data.append(new_doc)
        self._save_data()
        
        class InsertResult:
            inserted_id = new_doc["_id"]
        return InsertResult()

    def find(self, query=None, projection=None):
        query = query or {}
        results = []
        for doc in self.data:
            match = True
            for k, v in query.items():
                # Simple query matching
                if k == "_id" and isinstance(v, ObjectId):
                    v = str(v)
                if k == "_id" and isinstance(v, dict) and "$in" in v:
                    val_list = [str(x) if isinstance(x, ObjectId) else x for x in v["$in"]]
                    if doc.get(k) not in val_list:
                        match = False
                        break
                elif doc.get(k) != v:
                    match = False
                    break
            if match:
                # Deep copy
                results.append(json.loads(json.dumps(doc)))
        return results

    def find_one(self, query=None, projection=None):
        query = query or {}
        for doc in self.data:
            match = True
            for k, v in query.items():
                if k == "_id" and isinstance(v, ObjectId):
                    v = str(v)
                if doc.get(k) != v:
                    match = False
                    break
            if match:
                return json.loads(json.dumps(doc))
        return None

    def update_one(self, query, update_op, upsert=False):
        doc = self.find_one(query)
        if not doc:
            if upsert:
                # Insert a new one
                new_doc = {}
                if "$set" in update_op:
                    new_doc.update(update_op["$set"])
                for k, v in query.items():
                    if k == "_id" and isinstance(v, ObjectId):
                        v = str(v)
                    new_doc[k] = v
                self.insert_one(new_doc)
                class UpdateResultUpsert:
                    modified_count = 1
                    matched_count = 0
                    upserted_id = new_doc.get("_id")
                return UpdateResultUpsert()
            
            class UpdateResultNone:
                modified_count = 0
                matched_count = 0
                upserted_id = None
            return UpdateResultNone()

        # Apply update operations
        modified = False
        if "$set" in update_op:
            for k, v in update_op["$set"].items():
                if isinstance(v, ObjectId):
                    v = str(v)
                doc[k] = v
                modified = True
        
        if "$inc" in update_op:
            for k, v in update_op["$inc"].items():
                doc[k] = doc.get(k, 0) + v
                modified = True

        if modified:
            # Replace in array
            for idx, item in enumerate(self.data):
                item_id = str(item.get("_id"))
                doc_id = str(doc.get("_id"))
                if item_id == doc_id:
                    self.data[idx] = doc
                    break
            self._save_data()

        class UpdateResult:
            modified_count = 1 if modified else 0
            matched_count = 1
            upserted_id = None
        return UpdateResult()

    def delete_one(self, query):
        doc = self.find_one(query)
        if doc:
            doc_id = str(doc.get("_id"))
            self.data = [item for item in self.data if str(item.get("_id")) != doc_id]
            self._save_data()
            class DeleteResult:
                deleted_count = 1
            return DeleteResult()
        
        class DeleteResultZero:
            deleted_count = 0
        return DeleteResultZero()

    def count_documents(self, query=None):
        query = query or {}
        count = 0
        for doc in self.data:
            match = True
            for k, v in query.items():
                if k == "_id" and isinstance(v, ObjectId):
                    v = str(v)
                if doc.get(k) != v:
                    match = False
                    break
            if match:
                count += 1
        return count


class MockDatabase:
    def __init__(self, data_dir):
        self.data_dir = data_dir
        self.collections = {}

    def __getitem__(self, collection_name):
        if collection_name not in self.collections:
            db_path = os.path.join(self.data_dir, f"{collection_name}.json")
            self.collections[collection_name] = MockCollection(collection_name, db_path)
        return self.collections[collection_name]

    def __getattr__(self, name):
        return self[name]


# Initialize DB Connection
db = None
is_mock_db = False

try:
    # Try connecting to real MongoDB
    client = MongoClient(settings.MONGODB_URI, serverSelectionTimeoutMS=2000)
    # Check if server is available
    client.server_info()
    db = client[settings.DATABASE_NAME]
    logger.info("Connected to MongoDB successfully!")
except (ServerSelectionTimeoutError, Exception) as e:
    logger.warning(f"MongoDB connection failed: {e}. Falling back to JSON database.")
    # Initialize JSON Fallback DB
    fallback_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data"))
    db = MockDatabase(fallback_dir)
    is_mock_db = True

# Helper to normalize mongo object ids to strings in response
def clean_db_doc(doc):
    if not doc:
        return doc
    if "_id" in doc:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
    return doc

def clean_db_list(docs):
    return [clean_db_doc(doc) for doc in docs]

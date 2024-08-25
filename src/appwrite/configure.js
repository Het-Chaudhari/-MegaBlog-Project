import { Client, Databases, Query, ID, Storage } from "appwrite";
import conf from "../conf/conf.js";

class PostServices {
    client = new Client();
    database;
    bucket;

    constructor() {
        this.client
        .setEndpoint(conf.APPWRITE_URL)
        .setProject(conf.APPWRITE_PROJECT_ID);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    
    async createpost({ title, slug,content, featuredimg, status, userid }) {
        try {
            return await this.database.createDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug || ID.unique(), 
                { 
                    title,
                    content ,
                    featuredimg,
                    status,
                    userid 
                }
            );
        } catch (error) {
            console.log("Appwrite serive :: createPost error is", error)
            throw error;
        }
    }

    async updatepost(slug, { title,content , featuredimg, status }) {
        try {
            return await this.database.updateDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug,
                { title,content,featuredimg, status }
            );
        } catch (error) {
            throw error;
        }
    }

    async deletepost(slug) {
        try {
            await this.database.deleteDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getpost(slug) {
        try {
            return await this.database.getDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                slug
            );
        } catch (error) {
            throw error;
        }
    }

    async gotpost(queries = [Query.equal("status", "active")]) {
        try {

            
            return await this.database.listDocuments(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_COLLECTION_ID,
                
            );
        } catch (error) {
            console.log("Appwrite service :: gotpost error is", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.APPWRITE_BUCKET_ID,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.APPWRITE_BUCKET_ID,
            fileId
        );
    }
}

const postservices = new PostServices();

export default postservices;

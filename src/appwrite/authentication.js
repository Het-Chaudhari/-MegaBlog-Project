import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

class Auth {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.APPWRITE_PROJECT_ID);
        this.account = new Account(this.client);
    }
    async createaccount({email, password, name}) {
        try {
            const accountIs =  await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            //console.log("Account created:", accountIs); // Log the created account

            if (accountIs) {
              //  console.log("login vara ma request avi")
                return this.login({email, password});
            } else {
                return accountIs;
            }
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    async login({email, password}) {
      //  console.log("auth na login ma aya ")
        try {
          //  console.log("Logging in with", email, password); // Log parameters
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("auth service na login ma error che")
            throw error;
        }
    }

    async getcurrentuser() {
        try {
           // console.log("Getting current user");
            return await this.account.get();
        } catch (error) {
            console.error("Error getting current user:", error);
            return null;
        }
    }

    async logout() {
        try {
           // console.log("Logging out");
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error);
        }
    }
}

const authservices = new Auth();

export default authservices;

#  Refer & Earn — MERN Stack Project

This is a simple Refer & Earn system built using the MERN stack.  
The project includes user registration with unique referral codes and a feature to apply referral codes to earn reward coins.

---

##  Tech Stack

### **Frontend**
- React (Vite)
- TailwindCSS
- Fetch API

### **Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

---

##  Features

###  User Registration  
- Creates a new user  
- Generates a unique referral code automatically  
- Stores user details in MongoDB  

###  Apply Referral Code  
- Validates referral code  
- Prevents user from using their own code  
- Rewards the user using a configurable value stored in database  

###  Configurable Reward System  
- Reward amount stored in `config` collection  
- Easy to update without changing backend code  

###  Simple React UI  
- Registration screen  
- Referral apply screen  
- Shows user ID and referral code  
- Gives success / error messages  

---

##  Database Collections

### **users**
Stores:
- Name  
- Email  
- Password  
- Referral Code  
- Coins  

### **config**
Example:
```json
{
  "rewardCoins": 50
}
```



### How to Run This Project?

1️⃣ Start Backend
```
cd refer-earn-project
npm install
node server.js
```


Backend runs on:

```http://localhost:5000```

2️⃣ Start Frontend
```cd refer-earn-frontend
npm install
npm run dev
```


Frontend runs on:

```http://localhost:5173```

## API Endpoints
POST /api/register

Registers a new user and returns:

userId

referralCode

Example Request:
```
{
  "name": "Tanisha",
  "email": "tanisha@gmail.com",
  "password": "123456"
}
```

## POST /api/apply-referral

Applies a referral code and adds reward coins.

Example Request:
```{
  "userId": "USER_ID_HERE",
  "referralCode": "REF123"
}
```






 ### Author
 ## _Tanisha _Kathpal__

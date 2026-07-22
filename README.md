# SwiftCart 🛒

SwiftCart is a robust, full-stack, responsive e-commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It offers a complete online shopping experience, including user authentication, complex state management, product management, a shopping cart, secure payment gateway integrations, and an extensive admin dashboard.

---

## 🌟 Key Features & Capabilities

### End-User Experience
- **Advanced Authentication:** Secure login and registration using `bcrypt` for password hashing and `JSON Web Tokens (JWT)` stored securely in HTTP-only cookies. Includes forgot/reset password flows via SMTP email.
- **Product Discovery:** View all products with pagination. Advanced search functionality and filtering options (by category, price range, ratings).
- **Interactive Reviews:** Users can leave detailed ratings and textual reviews on products.
- **Dynamic Shopping Cart:** Persistent cart state using local storage. Add, remove, and adjust quantities on the fly. Stock verification prevents users from adding out-of-stock items.
- **Seamless Checkout Flow:** Multi-step checkout process (Shipping Info -> Confirm Order -> Payment). 
- **Payment Processing:** Integrated with **Razorpay** to process secure online transactions.
- **Order Tracking:** Users have a dedicated dashboard to view past orders and track current shipping/delivery status.

### Admin Dashboard
- **Centralized Control Panel:** Exclusive interface protected by Role-Based Access Control (RBAC).
- **Product Management:** Full CRUD capabilities. Admins can create new products and upload multiple images directly to **Cloudinary**.
- **Order Fulfillment:** View all user orders in the system, update lifecycle statuses (Processing -> Shipped -> Delivered), and manage inventory automatically upon dispatch.
- **User Management:** View registered users, assign roles (Promote to Admin), or remove accounts entirely.
- **Review Moderation:** Monitor product reviews and delete inappropriate content.

---

## 🏗️ Technical Architecture & Details

### Frontend Stack (Client-Side)
- **React.js:** Functional components and React Hooks for building the interactive UI.
- **Redux Toolkit (RTK):** Global state management is divided into modular slices (`userSlice`, `productSlice`, `cartSlice`, `orderSlice`, `adminSlice`) handling asynchronous thunks for API requests.
- **React Router Dom:** Handling client-side routing and Protected/Admin-only routes.
- **Tailwind CSS:** Utility-first CSS framework for highly responsive, modern, and aesthetic styling.
- **React Toastify:** For elegant, non-blocking flash notifications and error popups.

### Backend Stack (Server-Side)
- **Node.js & Express.js:** RESTful API architecture. Express 5.x routing mechanisms.
- **Custom Error Handling:** Centralized `errorMiddleware` and `handleAsyncError` wrapper to catch and format API errors globally without crashing the server.
- **Mongoose & MongoDB:** ODM (Object Data Modeling) enforcing strict schemas for `User`, `Product`, and `Order` entities.
- **Cloudinary Integration:** Images are intercepted via `express-fileupload` and pushed directly to Cloudinary's cloud storage.

### 🔐 Authentication & Authorization Workflow
The application implements a robust, two-tiered security model to protect sensitive data and admin actions:

**1. Authentication (Who are you?)**
- Passwords are encrypted using `bcrypt` before being saved to the MongoDB database.
- Upon successful login, the server generates a **JSON Web Token (JWT)**.
- Instead of sending the token back in the JSON body, the token is securely attached to an **HTTP-only Cookie**. This prevents client-side JavaScript from accessing the token, providing strong protection against Cross-Site Scripting (XSS) attacks.
- The custom `verifyUserAuth` backend middleware validates this cookie on every protected route to identify the user.

**2. Authorization (What can you do?)**
- Every user model has a `role` attribute, defaulting to `"user"`.
- A custom `roleBasedAccess(...roles)` middleware is chained to admin-specific routes (e.g., `roleBasedAccess("admin")`). This acts as a gatekeeper, rejecting access with a 403 Forbidden error if a standard user tries to perform admin actions like creating a product or deleting a user.
- On the Frontend, React Router uses a highly reusable `<ProtectedRoute>` component wrapper. This component checks the Redux `isAuthenticated` state and the user's `role` to conditionally render admin dashboards or redirect unauthorized users to the login page.

**3. Password Reset & Mail System (Nodemailer)**
- The application uses `nodemailer` configured with an SMTP service (like Gmail) to handle outbound emails.
- When a user forgets their password, they submit their email address. The backend uses the native Node.js `crypto` module to generate a highly secure, random 20-byte hex token.
- A **SHA-256 hashed version** of this token is saved to the database along with a 15-minute expiration timestamp (`resetPasswordExpire`). 
- The user is emailed a recovery link containing the **unhashed** token. 
- When the user clicks the link and submits a new password, the server hashes the token from the URL, compares it against the database, verifies it hasn't expired, and securely updates the password. This split-token design prevents database leaks from compromising reset links!

---

## 🗄️ Database Schema & Relationships

The application uses MongoDB as its primary database, with Mongoose enforcing structured schemas. The database consists of three primary collections: **Users**, **Products**, and **Orders**.

### Entity Relationships

- **User & Product (One-to-Many):** A specific User (Admin) creates a Product. Thus, the Product schema stores a reference to the `User` who created it. Additionally, users can leave reviews on products. Each review within a Product's `reviews` array contains a reference to the `User` who authored the review.
- **User & Order (One-to-Many):** A User can place multiple orders. Each document in the Order collection contains a reference to the `User` who placed it, ensuring order history is securely tied to the respective account.
- **Order & Product (Many-to-Many via Order Items):** An Order contains an `orderItems` array. Each item within this array holds a direct reference (`ObjectId`) to the specific `Product` purchased, allowing the system to fetch real-time product details and adjust inventory levels upon order confirmation.

### 1. User Collection (`User`)
Stores all authentication credentials, profile information, and authorization roles.

- `name`: (String, Required) User's full name (3-25 characters).
- `email`: (String, Required, Unique) Validated email address.
- `password`: (String, Required) Hashed password (min 8 characters). Hidden by default in queries (`select: false`).
- `avatar`: (Object)
  - `public_id`: (String, Required) Cloudinary image ID.
  - `url`: (String, Required) Cloudinary image URL.
- `role`: (String) Determines access level. Defaults to `"user"`. Can be upgraded to `"admin"`.
- `resetPasswordToken`: (String) Temporary token for password recovery.
- `resetPasswordExpire`: (Date) Expiration timestamp for the reset token.
- `timestamps`: Automatically manages `createdAt` and `updatedAt`.

### 2. Product Collection (`Product`)
Stores the catalog of all items available for purchase, including inventory and nested reviews.

- `name`: (String, Required) Name of the product.
- `description`: (String, Required) Detailed description.
- `price`: (Number, Required) Price of the product (Max 7 digits).
- `ratings`: (Number) Average rating based on all user reviews. Defaults to `0`.
- `image`: (Array of Objects) Supports multiple product images.
  - `public_id`: (String, Required) Cloudinary image ID.
  - `url`: (String, Required) Cloudinary image URL.
- `category`: (String, Required) Product category for filtering.
- `stock`: (Number, Required) Current inventory level (Max 5 digits). Defaults to `1`.
- `numOfReviews`: (Number) Total count of reviews. Defaults to `0`.
- `reviews`: (Array of Objects) Embedded documents for user feedback.
  - `user`: (ObjectId, Ref: `User`, Required) The user who left the review.
  - `name`: (String, Required) Reviewer's name.
  - `rating`: (Number, Required) Individual rating given.
  - `comment`: (String, Required) Textual review content.
- `user`: (ObjectId, Ref: `User`, Required) The admin user who created this product listing.
- `createdAt`: (Date) Timestamp of product creation.

### 3. Order Collection (`Order`)
Tracks the entire lifecycle of a customer purchase, shipping details, and payment status.

- `shippingInfo`: (Object, Required) Where the order should be delivered.
  - `address`, `city`, `state`, `country`, `pinCode`, `phoneNo`: All required fields.
- `orderItems`: (Array of Objects, Required) Snapshot of the items purchased.
  - `name`: (String, Required) Product name at time of purchase.
  - `price`: (Number, Required) Product price at time of purchase.
  - `quantity`: (Number, Required) Quantity ordered.
  - `image`: (String, Required) Main product image URL.
  - `product`: (ObjectId, Ref: `Product`, Required) Link to the original product in the database.
- `user`: (ObjectId, Ref: `User`, Required) The customer who placed the order.
- `paymentInfo`: (Object, Required) Details from the payment gateway.
  - `id`: (String, Required) Payment transaction ID (e.g., Razorpay payment ID).
  - `status`: (String, Required) Payment status.
- `paidAt`: (Date, Required) Timestamp of successful payment.
- `itemPrice`: (Number, Required) Subtotal of items.
- `taxPrice`: (Number, Required) Calculated tax.
- `shippingPrice`: (Number, Required) Delivery charges.
- `totalPrice`: (Number, Required) Final billed amount.
- `orderStatus`: (String, Required) Current lifecycle status (Defaults to `"Processing"`).
- `deliveredAt`: (Date) Timestamp when the order was fulfilled.
- `createdAt`: (Date) Order placement timestamp.

---

## 📡 API Routings

All API endpoints are prefixed with `/api/v1`

### Products
- `GET /products` - Get all products (supports search queries)
- `GET /product/:id` - Get a single product details
- `PUT /review` - Create or update a product review
- `GET /reviews` - Get all reviews for a product

### Orders
- `POST /new/order` - Create a new order (Decrements stock)
- `GET /order/:id` - Get details of a specific order
- `GET /orders/user` - Get logged in user's orders

### Users & Auth
- `POST /register` - Register a new user
- `POST /login` - Login user and set JWT cookie
- `POST /logout` - Logout user and destroy cookie
- `POST /password/forgot` - Request password reset email
- `POST /reset/:token` - Reset password using crypto token
- `GET /profile` - Get logged in user details
- `PUT /profile/update` - Update user profile
- `PUT /password/update` - Update user password

### Payments
- `POST /payment/process` - Create a Razorpay order
- `GET /getKey` - Get Razorpay API Key for frontend verification
- `POST /paymentVerification` - Verify Razorpay payment signature via HMAC SHA256

### Admin Only Routes
- `GET /admin/products` - Get all products (Admin)
- `POST /admin/product/create` - Create a new product
- `PUT /admin/product/:id` - Update a product
- `DELETE /admin/product/:id` - Delete a product
- `GET /admin/reviews` - Get all reviews
- `DELETE /admin/reviews` - Delete a specific review
- `GET /admin/orders` - Get all orders
- `PUT /admin/order/:id` - Update order status (Processing/Shipped/Delivered)
- `DELETE /admin/order/:id` - Delete an order
- `GET /admin/users` - Get all users
- `GET /admin/user/:id` - Get specific user details
- `PUT /admin/user/:id` - Update user role
- `DELETE /admin/user/:id` - Delete a user

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local installation or MongoDB Atlas cluster)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/SwiftCart.git
cd SwiftCart
```

### 2. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
npm install --prefix frontend
```

### 3. Environment Variables setup
A `.env.sample` file is provided in `backend/config/.env.sample`. Create a new `.env` file in the same directory (`backend/config/.env`) and fill it out:

- **MongoDB:** Add the connection URI to `DB_URL`.
- **JWT:** Provide a long random string for `JWT_SECRET_KEY`.
- **SMTP:** For password reset emails, use a Gmail account. You will need to generate an [App Password](https://support.google.com/accounts/answer/185833?hl=en) from your Google Account settings and put it in `SMTP_PASSWORD`.

#### Cloudinary Setup (Product Images)
1. Go to [Cloudinary](https://cloudinary.com/) and create a free account.
2. Find your "Cloud Name", "API Key", and "API Secret" on your Dashboard.
3. Add them to `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.

#### Razorpay Setup (Payments)
1. Go to [Razorpay](https://razorpay.com/) and create an account.
2. In your dashboard, switch to **Test Mode**.
3. Go to Settings > API Keys and generate a new key pair.
4. Add them to `RAZORPAY_API_KEY` and `RAZORPAY_API_SECRET`.

> [!WARNING]  
> **Testing Payments without a Business**  
> Since this is a portfolio project and you likely do not have a registered business to activate live payments, **keep Razorpay in Test Mode**. During checkout on the site, you MUST use the [Test Debit/Credit Cards provided by Razorpay](https://razorpay.com/docs/payments/payments/test-card-details/) to successfully simulate a payment. Real cards will fail in test mode.

### 4. Run the Application locally
```bash
# Start the backend server
npm run dev

# In a separate terminal, start the React frontend
cd frontend
npm run dev
```

### 5. Deployment (Production)
For hosting platforms like Render or Heroku:
1. Ensure `package.json` contains the build script: `"build": "npm install && npm install --prefix frontend && npm run build --prefix frontend"`
2. Set the `NODE_ENV` environment variable to `PRODUCTION` on your hosting provider.
3. Ensure all environment variables from `.env` are injected into your hosting provider's dashboard.
4. The express server will automatically serve the static React frontend from `frontend/dist` in production mode.

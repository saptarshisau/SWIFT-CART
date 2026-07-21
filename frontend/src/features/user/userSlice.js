import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Register API
export const register = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post('/api/v1/register', userData, config)
        return data

    } catch (error) {
        return rejectWithValue(error.response?.data || 'Registration failed. Please try again later')
    }
})
export const login = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/login', { email, password }, config)
        return data

    } catch (error) {
        return rejectWithValue(error.response?.data || 'Login failed. Please try again later')
    }
})

export const loadUser = createAsyncThunk('user/loadUser', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/v1/profile', { withCredentials: true });
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to load user profile')
    }
})

export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/api/v1/logout', { withCredentials: true }); //it tells to include the cookie in this req to the backend so that server can delete the cookie 
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Logout failed')
    }
})

export const updateProfile = createAsyncThunk('user/updateProfile', async (userData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
            //error--> was passing this in axios.put()
        }
        const { data } = await axios.put('/api/v1/profile/update', userData, config);
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Profile update failed. Please try again later' })
    }
})

export const updatePassword = createAsyncThunk('user/updatePassword', async (formData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put('/api/v1/password/update', { withCredentials: true }, formData, config);
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Password update failed')
    }
})


export const forgotPassword = createAsyncThunk('user/forgotPassword', async (email, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/password/forgot', email, config);
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Email sent Failed' })
    }
})

export const resetPassword = createAsyncThunk('user/resetPassword', async ({ token, userData }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/v1/reset/${token}`, userData, config);
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Email sent Failed' })
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null, //null, 
        loading: false,
        error: null,
        success: false,
        isAuthenticated: localStorage.getItem('isAuthenticated') === 'true', //false,
        message: null
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null
        },
        removeSuccess: (state) => {
            state.success = null
        }
    },
    extraReducers: (builder) => {
        // Registration cases
        builder
            .addCase(register.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false,
                    state.error = null
                state.success = action.payload.success
                state.user = action.payload?.user || null
                state.isAuthenticated = Boolean(action.payload?.user)

                //Store in localStorage
                localStorage.setItem('user', JSON.stringify(state.user));
                localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated));
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || 'Registration failed. Please try again later'
                state.user = null
                state.isAuthenticated = false
            })


        // Login cases
        builder
            .addCase(login.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false,
                    state.error = null
                state.success = action.payload.success
                state.user = action.payload?.user || null
                state.isAuthenticated = Boolean(action.payload?.user)
                //Store in localStorage
                localStorage.setItem('user', JSON.stringify(state.user));
                localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated));

            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || 'Login failed. Please try again later'
                //optional chaining?. is used to avoid null errors
                state.user = null
                state.isAuthenticated = false
            })

        // Loading User
        builder
            .addCase(loadUser.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false,
                    state.error = null
                state.user = action.payload?.user || null  //can remove these two as already taken care while login
                state.isAuthenticated = Boolean(action.payload?.user)
                //Store in localStorage
                localStorage.setItem('user', JSON.stringify(state.user));
                localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated));
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || 'Failed to load user profile'
                state.user = null
                state.isAuthenticated = false

                if (action.payload?.statusCode === 401) {
                    state.user = null;
                    state.isAuthenticated = false;
                    localStorage.removeItem('user')
                    localStorage.removeItem('isAuthenticated')
                    //chack the last space of this page
                }
            })

        // Logout User
        builder
            .addCase(logout.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false,
                    state.error = null
                state.user = null
                state.isAuthenticated = false
                //but when will this local storage get deleted? coz the cookies will eventually be deleted after logout, but user info is still in local storage, so after refresh will it show logged in? that would be bad
                //exactly solved here
                localStorage.removeItem('user')
                localStorage.removeItem('isAuthenticated')

            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || 'Failed to load user profile'
            })

        // Update User Profile
        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false,
                    state.error = null
                state.user = action.payload?.user || null
                state.success = action.payload?.success
                state.message = action.payload?.message

            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || 'Profile update failed. Please try again later'
            })

        // Update User Password
        builder
            .addCase(updatePassword.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false,
                    state.error = null
                state.success = action.payload?.success

            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || 'Password update failed'

            })

        // Forgot Password
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false,
                    state.error = null
                state.success = action.payload?.success
                state.message = action.payload?.message

            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || 'Email sent failed'

            })
        // Reset Password
        builder
            .addCase(resetPassword.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false,
                    state.error = null
                state.success = action.payload?.success
                state.user = null,
                    state.isAuthenticated = false

            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload?.message || 'Email sent failed'

            })

    }
})

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;

/*
1.
Why multipart/form-data?

If you sent JSON

{
    "name":"John",
    "avatar":"????"
}

JSON cannot upload binary files directly.

Instead,

the browser creates something like

------Boundary

Content-Disposition:
form-data;
name="name"

Saptarshi

------Boundary

Content-Disposition:
form-data;
name="email"

abc@gmail.com

------Boundary

Content-Disposition:
form-data;
name="password"

123456

------Boundary

Content-Disposition:
form-data;
name="avatar"

<Base64 Image>

------Boundary--

This format is called multipart/form-data.

The backend knows how to separate each field.
*/



/*
2.
but i have already stored user and isAuth in local storage and i have started to us the is statement for dispatch(loadUser) in app.jsx, why is it still needed?

Scenario 1: Everything is normal

Login:

Login
↓

Backend creates cookie

↓

Redux
user = Saptarshi
isAuthenticated = true

↓

localStorage
user = Saptarshi
isAuthenticated = true

Refresh:

Redux initializes from localStorage:

user = Saptarshi
isAuthenticated = true

App.jsx:

useEffect(() => {
    if (isAuthenticated) {
        dispatch(loadUser());
    }
}, [isAuthenticated]);

Since isAuthenticated is true, loadUser() runs.

Backend sees the cookie and returns the user.

Everything stays synchronized.

Scenario 2: Cookie disappears

Now imagine the user doesn't click Logout.

Instead:

the JWT expires,
or they manually delete cookies,
or the server invalidates the session.

localStorage still contains:

user = Saptarshi
isAuthenticated = true

because localStorage never expires automatically.

Next refresh:

Redux becomes

user = Saptarshi
isAuthenticated = true

because of localStorage.

App.jsx says:

if (isAuthenticated) {
    dispatch(loadUser());
}

So loadUser() runs.

Backend checks:

Cookie?

Answer:

❌ No

Returns:

401 Unauthorized

Now what should happen?

You must clear:

state.user = null;
state.isAuthenticated = false;

localStorage.removeItem("user");
localStorage.removeItem("isAuthenticated");

Otherwise localStorage still says:

isAuthenticated = true

On the next refresh, you'll repeat the same incorrect cycle.

That's why the 401 handler exists

It's essentially saying:

"I trusted localStorage, but the backend proved it's wrong."

So the frontend corrects itself.
*/
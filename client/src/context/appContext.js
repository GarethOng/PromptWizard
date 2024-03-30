import React, { useReducer, useContext } from 'react'
import reducer from './reducer'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  TOGGLE_SIDEBAR,
  ADD_CONTRACTOR_SUCCESS,
} from './action'
import axios from 'axios'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const googletoken = localStorage.getItem('googletoken')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  showSidebar: false,
  googletoken: googletoken,
  telegramtoken: '',
  keyword: '',
  contactSearch: '',
  messages: [],
  totalMessages: 0,
  gmail: '',
  sort: 'latest',
  contactKeyword: '',
  sortOptions: ['latest', 'lowest-highest', 'highest-lowest'],
  contactSort: 'default',
  contactOptions: [
    '< $10,000',
    '$10,000 - $50,000',
    '$50,000 - $100,000',
    '> $100,000',
  ],
  filter: 'unclassified',
  contactType: [
    '< $10,000',
    '$10,000 - $50,000',
    '$50,000 - $100,000',
    '> $100,000',
  ],
  contacts: [],
  totalContacts: 0,
  isEditing: false,
  editContactId: '',
  editContactName: '',
  editContactGmail: '',
  editContactRelationship: '',
  editTelegram: '',
  showRead: 'only unread',
  showReadOption: ['all', 'only unread'],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const authFetch = axios.create({
    baseURL: '/api/v1',
  })

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('googletoken')
    localStorage.removeItem('telegramtoke ')
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      const response = await axios.post(
        'http://localhost:5001/api/v1/auth/register',
        currentUser
      )
      const { user, token } = response.data
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
        },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      console.log(error.response)
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    console.log(currentUser)
    try {
      const { data } = await axios.post(
        'http://localhost:5001/api/v1/auth/login',
        currentUser
      )
      const { user, token } = data

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      })

      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const displayAddContractorSuccess = () => {
    console.log('displayAddContractorSuccess')
    dispatch({ type: ADD_CONTRACTOR_SUCCESS })
    clearAlert()
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        displayAddContractorSuccess,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }

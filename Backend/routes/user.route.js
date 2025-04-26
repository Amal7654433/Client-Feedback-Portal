import express from 'express'
import { checkAuth, userLogin, userLogout, userSignup } from '../controller/user.controller.js'
import { ProtectedRoute } from '../middlewares/auth.middleware.js'
const router = express.Router()

router.post('/signup', userSignup)
router.post('/login', userLogin)
router.post('/logout', userLogout)
router.get('/verify',ProtectedRoute,checkAuth)
export default router
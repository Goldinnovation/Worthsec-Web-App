// const express = require('express')
import { Router } from "express";
const router = Router()
// const userExploreEvents = require('../controller/handleExploreEvents')
import {exploreEvents} from '../../controller/Event/handleExploreEvents'
import authMiddlewareCheck from "../../Middlware/Auth/authMiddleWare";




router.get('/', authMiddlewareCheck, exploreEvents)


export default router


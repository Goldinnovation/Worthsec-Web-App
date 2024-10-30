// const express = require('express')
import { Router } from "express";
const router = Router()
// const userExploreEvents = require('../controller/handleExploreEvents')
import {exploreEvents} from '../../controller/handleExploreEvents'
import authMiddlewareCheck from "../../Middlware/authMiddleWare";




router.get('/', authMiddlewareCheck, exploreEvents)


export default router


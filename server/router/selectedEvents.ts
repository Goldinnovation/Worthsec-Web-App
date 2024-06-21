// const express = require('express')
import { Router } from "express";
const router = Router()
// const userExploreEvents = require('../controller/handleExploreEvents')
import {exploreEvents} from '../controller/handleExploreEvents'




router.get('/', exploreEvents)


export default router


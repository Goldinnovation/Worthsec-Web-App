// const express = require('express')
import { Router } from "express";
const router = Router()
// const userExploreEvents = require('../controller/handleExploreEvents')
import {exploreEvents} from '../controller/handleExploreEvents'
const apicache = require('apicache');
const cache = apicache.middleware;



router.get('/', exploreEvents)


export default router


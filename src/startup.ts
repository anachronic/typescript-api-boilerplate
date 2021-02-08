import { Container } from "typescript-ioc";
import { pool } from "./database";

// Do NOT export anything from this file
Container.bindName("db").to(pool);

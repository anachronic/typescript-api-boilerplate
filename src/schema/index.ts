import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";

const storage = getMetadataArgsStorage();

export const spec = routingControllersToSpec(storage);

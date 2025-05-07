import { type RouteConfig, index, route } from "@react-router/dev/routes" 

export default [
    index("routes/index.tsx"),
    route("issues/:id", "routes/issues/$id.tsx"),
] satisfies RouteConfig
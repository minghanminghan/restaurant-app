TODO:
    Backend:
        x integrate db (standardize functions from db/init_config.js)
        o integrate payment (stripe)
        - scale up (handle restaurant, menu configuration)

    Frontend:
        - ui overhaul
            - colors
            - positions
        - increase interactivity to menu items
            - overlay
            - more state

    Ops:
        o add tests
        x dockerize

.env config for dev environment (push this?):
    express/.env:
        EXPRESS_PORT = 3001
        REACT_URL = http://localhost:3000
        DB = "mongodb://127.0.0.1/restaurant"
    frontend/.env:
        REACT_APP_BACKEND_URL = "http://localhost:3001"
        REACT_APP_RESTAURANT_NAME = "test"
        REACT_APP_ORDER_NUMBER = 0
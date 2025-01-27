TODO:
    Backend:
        integrate db (IN PROGRESS)
        integrate payment

    Frontend:
        ui overhaul
            - colors
            - positions
        increase interactivity to menu items
            - overlay
            - more state

    Ops:
        add tests (IN PROGRESS)
        dockerize

.env config for dev environment (push this?):
    express/.env:
        EXPRESS_PORT = 3001
        REACT_URL = http://localhost:3000
        DB = "mongodb://127.0.0.1/restaurant"
    frontend/.env:
        REACT_APP_BACKEND_URL = "http://localhost:3001"
        REACT_APP_RESTAURANT_NAME = "test"
        REACT_APP_ORDER_NUMBER = 0
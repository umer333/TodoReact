


import fastapi
import uvicorn
import os

from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.responses import  JSONResponse
from api import users, tasks


from fastapi.staticfiles import StaticFiles


app = fastapi.FastAPI()


@app.exception_handler(StarletteHTTPException)
def http_exception_handler(request, exc):
    return JSONResponse(content="Not Valid Request",
                        status_code=exc.status_code)


origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(tasks.router)


# app.mount("/static", StaticFiles(directory="workflow_thumbnails"), name="static")
if __name__ == '__main__':
    # Create Thread for scanner
    # stop_scan = False
    # t = threading.Thread(target=start_scanner, args=[(lambda: stop_scan)])
    # t.start()

    # Start FastApi Server
    uvicorn.run("main:app", port=8000, host='192.168.24.65', reload=True)

    # Stop Thread
    # stop_scan = True
    # t.join()

    # uvicorn.run("main:app", port=8000, host='127.0.0.1', reload=True)


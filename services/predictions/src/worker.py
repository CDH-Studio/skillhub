# Uncomment the below code to enable rq for redis workers.
# Make sure to specify the REDIS_URL and REDIS_QUEUE in config.py.

# import logging
# import redis
# from config import REDIS_URL, REDIS_QUEUE
# from rq import Connection, Worker
#
#
# LOGGING_FORMAT = "[%(levelname)s] (%(asctime)s) %(name)s (%(lineno)s) - %(message)s"
# logging.basicConfig(format=LOGGING_FORMAT, level=logging.INFO)
#
# with Connection(redis.from_url(REDIS_URL)):
#     logging.info("Starting worker")
#     worker = Worker([REDIS_QUEUE])
#     worker.work()

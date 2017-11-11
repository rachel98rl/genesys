#!/usr/bin/python
import sys
import logging

#execfile (activate_this, dict(__file__ = activate_this))

logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/Linker")

from Linker import app as application

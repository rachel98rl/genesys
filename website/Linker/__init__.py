from flask import *
import json
import os
from CandidateManager import *


app = Flask(__name__)


@app.route("/")
def hello():
    if session.get("logged_in_email"):
        email = session.get("logged_in_email")
        return render_template("main.html", email=email)
    else:
        return redirect(url_for("login"))


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/loginClick")
def loginClick():
    email = request.form["email"]
    password = request.form["password"]
    # For hackathon we just hard-code the users into database
    session["logged_in_email"] = email
    candidateManager = CandidateManager(email)
    session["candidateManager"] = candidateManager
    return ("LOGIN_SUCCESS", 200, )


@app.route("/logout")
def logout():
    if session.get('logged_in_email', None):
        session.pop("logged_in_email")
    return redirect(url_for("hello"))


@app.route("/getMostMatchingCandidates")
def getMostMatchingCandidates():
    retdata = session["candidateManager"].getMostMatchingCandidates()
    if retdata:
        return retdata
    else:
        return ("NO_MORE_CANDIDATES", 200, )


@app.route("/candidateSwipe", methods=['GET'])
def candidateSwipe():
    response = request.args.get("swipeResponse")
    cm = session["candidateManager"]
    matched = cm.addResponse(response)
    if matched:
        return ("MATCHED", 200, )  
    else:
        return ("UNMATCHED", 200, )


@app.route("/matchedCandidatesPage")
def matchedCandidates():
    pass  # Comes from the swipe matching page.

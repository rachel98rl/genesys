if (window.location.pathname == "/") {
    var email = $("#email");
    $.get(
        "/getMostMatchingCandidates",
        function(data, status) {
            console.log("Data received is: " + data.toString());
            // Data is going to be a JSON array
            candidate_obj = document.createElement("div");
            candidate_obj.setAttribute("class", "candidate");
            // Display all contents here
            for (j = 0; j < data[i].length; j++) {
                var entry = data[i][j];
                var attr_name = entry[0];
                var attr_val = entry[1];
                var dom = document.createElement("div");
                var text0 = document.createTextNode(attr_name.toString());
                var text1 = document.createTextNode(attr_val.toString());
                dom.appendChild(text0);
                dom.appendChild(text1);
                candidate_obj.appendChild(dom);
            }
            candidate_obj.swipe({
                swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                    console.log("You swiped " + direction);
                    candidate_obj.setAttribute("-webkit-transition", "transform 2s ease-in-out")
                    if (direction == "left") {
                        candidate_obj.setAttribute("transform", "translate(-100px, 0)")
                        candidate_obj.setAttribute("display", "none")
                        $.get("/candidateSwipe&swipeResponse=0",
                        function(data, status) {
                            if (data == "MATCHED") {
                                // TODO -open up another window, allow users to keep swiping in previous one
                            }
                        });
                    } else if (direction == "right") {
                        candidate_obj.setAttribute("transform", "translate(100px, 0)")
                        candidate_obj.setAttribute("display", "none")
                        $.get("/candidateSwipe&swipeResponse=1",
                        function(data, status) {
                            if (data == "MATCHED") {
                                // TODO -open up another window, allow users to keep swiping in previous one
                            }
                        });
                    }
                }
            })
        }
    );
}

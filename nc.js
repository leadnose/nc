// Define the actual function and some private helper functions using a module pattern
var NC = (function() {
    // Calculates distance between two points, (x1,y1) and (x2, y2).
    function distance(x1, y1, x2, y2) {
        var dx = Math.abs(x1-x2);
        var dy = Math.abs(y1-y2);
        var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        return d;
    }

    // Calculates the effective power of a link station for device.
    function stationPower(linkStation, devicePoint) {
        var xLink = linkStation[0];
        var yLink = linkStation[1];
        var reach = linkStation[2];

        var xDev = devicePoint[0];
        var yDev = devicePoint[1];

        var devDistFromLink = distance(xLink, yLink, xDev, yDev);

        if(devDistFromLink > reach) {
            return 0;
        }

        var availReach = reach - devDistFromLink;
        var power = Math.pow(availReach, 2);

        return power;
    }

    // Returns most suitable link and its power in an array, or null if no suitable link is found
    function mostSuitableLinkAndPower(linkStations, devicePoint) {
        var bestLink = null;
        var bestPower = -1;

        for (var linkStation of linkStations) {
            var linkPower = stationPower(linkStation, devicePoint);
            if (linkPower > 0 && linkPower > bestPower) {
                bestPower = linkPower;
                bestLink = linkStation;
            }
        }

        if (-1 == bestPower) {
            return null;
        } else {
            return [bestLink, bestPower];
        }
    }

    // This is the actual function requested in the assignment
    function mostSuitableLink(linkStations, devicePoint) {
        var tmp = mostSuitableLinkAndPower(linkStations, devicePoint);
        if(tmp != null) {
            var bestLink = tmp[0]
            var bestPower = tmp[1];
            return "Best link station for point "  +
                devicePoint[0] + "," + devicePoint[1] + " is " +
                bestLink[0] + "," + bestLink[1] + " with power " + bestPower;
        } else {
            return "No link station within reach for point " +
                devicePoint[0] + "," + devicePoint[1];
        }
    }

    // Export only one function
    return {
        mostSuitableLink : mostSuitableLink
    };
})();

// Use the defined function
(function() {

    var LINK_STATIONS = [
        [0, 0, 10],
        [20, 20, 5],
        [10, 0, 12]
    ];

    var DEVICE_POINTS = [
        [0,0],
        [100, 100],
        [15, 10],
        [18, 18]
    ];


    for (var devicePoint of DEVICE_POINTS) {
        var output = NC.mostSuitableLink(LINK_STATIONS, devicePoint);
        console.log(output);
    }
    
})();

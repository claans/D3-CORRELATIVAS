var width = 1980,
    height = 1090,
    root;

var force = d3.layout.force()
    .linkDistance(80)
    .charge(-120)
    .gravity(.05)
    .size([width, height])
    .on("tick", tick);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");


/*
d3.json("file:///C:/Users/Mu_Cl/Desktop/pruebaConceptual-Correlativas-main/graph.json", function (error, json) {

    console.log("pasa");
    if (error) throw error;

    root = json;
    update();
});*/



root = {
    "name": "Proyecto Final",
    "size": 200000,
    "children": [

        // ARE
        {
            "name": "ARE",
            "size": 80000,
            "children": [{
                    "name": "SOP",
                    "size": 45000,
                    "children": [{
                            "name": "MAD",
                            "size": 30000
                        },
                        {
                            "name": "AED",
                            "size": 30000
                        },
                        {
                            "name": "ACO",
                            "size": 30000
                        },
                    ]

                },
                {
                    "name": "DSI",
                    "size": 45000,
                    "children": [{
                            "name": "ASI",
                            "size": 30000,
                            "children": [{
                                "name": "AED",
                                "size": 25000
                            },
                            {
                                "name": "SOR",
                                "size": 25000
                            }]
                        },
                        {
                            "name": "PPR",
                            "size": 30000,
                            "children": [{
                                "name": "MAD",
                                "size": 25000
                            },
                            {
                                "name": "AED",
                                "size": 25000
                            }]
                        }
                    ]
                },
                {
                    "name": "ECO",
                    "size": 45000,
                    "children": [{
                            "name": "DSI",
                            "size": 30000,
                            "children": [{
                                    "name": "ASI",
                                    "size": 30000,
                                    "children": [{
                                        "name": "AED",
                                        "size": 25000
                                    },
                                    {
                                        "name": "SOR",
                                        "size": 25000
                                    }]
                                },
                                {
                                    "name": "PPR",
                                    "size": 30000,
                                    "children": [{
                                        "name": "MAD",
                                        "size": 25000
                                    },
                                    {
                                        "name": "AED",
                                        "size": 25000
                                    }]
                                }
                            ]
                        }
                    ]
                },

            ]
        },

        // RIN
        {
            "name": "RIN",
            "size": 80000,
            "children": [{
                    "name": "SOP",
                    "size": 45000,
                    "children": [{
                            "name": "MAD",
                            "size": 30000
                        },
                        {
                            "name": "AED",
                            "size": 30000
                        },
                        {
                            "name": "ACO",
                            "size": 30000
                        },
                    ]

                },
                {
                    "name": "COM",
                    "size": 45000,
                    "children": [{
                            "name": "ACO",
                            "size": 30000
                        },
                        {
                            "name": "AMI2",
                            "size": 30000,
                            "children": [{
                                "name": "AGA",
                                "size": 25000
                            },
                            {
                                "name": "AMI",
                                "size": 25000
                            }]
                        },
                        {
                            "name": "FIS2",
                            "size": 30000,
                            "children": [{
                                "name": "FIS1",
                                "size": 25000
                            },
                            {
                                "name": "AMI",
                                "size": 25000
                            }]
                        }
                    ]
                }

            ]
        },

        // LEG
        {
            "name": "LEG",
            "size": 80000,
            "children": [{
                    "name": "ASI",
                    "size": 45000,
                    "children": [{
                            "name": "AED",
                            "size": 30000
                        },
                        {
                            "name": "SOR",
                            "size": 30000
                        }
                    ]
                },
                {
                    "name": "ISO",
                    "size": 45000
                }

            ]
        },

        // ISW
        {
            "name": "ISW",
            "size": 80000,
            "children": [{
                    "name": "GDA",
                    "size": 45000,
                    "children": [{
                            "name": "ASI",
                            "size": 30000,
                            "children": [{
                                "name": "AED",
                                "size": 25000
                            },
                            {
                                "name": "SOR",
                                "size": 25000
                            }]
                        },
                        {
                            "name": "SSL",
                            "size": 30000,
                            "children": [{
                                "name": "MAD",
                                "size": 25000
                            },
                            {
                                "name": "AED",
                                "size": 25000
                            }]
                        },
                        {
                            "name": "PPR",
                            "size": 30000,
                            "children": [{
                                "name": "MAD",
                                "size": 25000
                            },
                            {
                                "name": "AED",
                                "size": 25000
                            }]
                        },
                    ]

                },
                {
                    "name": "DSI",
                    "size": 45000,
                    "children": [{
                            "name": "ASI",
                            "size": 30000,
                            "children": [{
                                "name": "AED",
                                "size": 25000
                            },
                            {
                                "name": "SOR",
                                "size": 25000
                            }]
                        },
                        {
                            "name": "PPR",
                            "size": 30000,
                            "children": [{
                                "name": "MAD",
                                "size": 25000
                            },
                            {
                                "name": "AED",
                                "size": 25000
                            }]
                        }
                    ]
                },
                {
                    "name": "PYE",
                    "size": 45000,
                    "children": [{
                            "name": "AGA",
                            "size": 30000
                        },
                        {
                            "name": "AMI",
                            "size": 30000
                        }
                    ]
                },

            ]
        },

    ]

};

update();

function update() {
    var nodes = flatten(root),
        links = d3.layout.tree().links(nodes);

    // Restart the force layout.
    force
        .nodes(nodes)
        .links(links)
        .start();

    // Update links.
    link = link.data(links, function (d) {
        return d.target.id;
    });

    link.exit().remove();

    link.enter().insert("line", ".node")
        .attr("class", "link");

    // Update nodes.
    node = node.data(nodes, function (d) {
        return d.id;
    });

    node.exit().remove();

    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .on("click", click)
        .call(force.drag);

    nodeEnter.append("circle")
        .attr("r", function (d) {
            return Math.sqrt(d.size) / 10 || 4.5;
        });

    nodeEnter.append("text")
        .attr("dy", ".35em")
        .text(function (d) {
            return d.name;
        });

    node.select("circle")
        .style("fill", color);
}

function tick() {
    link.attr("x1", function (d) {
            return d.source.x;
        })
        .attr("y1", function (d) {
            return d.source.y;
        })
        .attr("x2", function (d) {
            return d.target.x;
        })
        .attr("y2", function (d) {
            return d.target.y;
        });

    node.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });
}

function color(d) {
    return d._children ? "#3182bd" // collapsed package
        :
        d.children ? "#c6dbef" // expanded package
        :
        "#fd8d3c"; // leaf node
}

// Toggle children on click.
function click(d) {
    if (d3.event.defaultPrevented) return; // ignore drag
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update();
}

// Returns a list of all nodes under the root.
function flatten(root) {
    var nodes = [],
        i = 0;

    function recurse(node) {
        if (node.children) node.children.forEach(recurse);
        if (!node.id) node.id = ++i;
        nodes.push(node);
    }

    recurse(root);
    return nodes;
}
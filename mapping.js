

// const width = window.innerWidth;
// const height = window.innerHeight;
// const total = width + height;

// const width = 2000;
// const height = 2000;

let zoom = d3.zoom()
        .on('zoom', handleZoom)
        .on('end', () => svg.style("cursor", "grab"))
        .scaleExtent([0.2, 10])

function handleZoom(e){
    // console.log(e.transform)
          d3.selectAll("svg g").attr('transform', e.transform);
        //   document.getElementById("post-popup").style.transform = `translate(${e.transform.x*e.transform.k}px, ${e.transform.y*e.transform.k}px)`
        //   document.getElementById("post-popup").style.scale = e.transform.k
        }

function initZoom(){
        d3.select("svg").call(zoom)
        // d3.select("#post-popup").call(zoom)
        }  

const svg = d3.select("#canvas")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            // .attr("viewBox", `-${width/2}, -${height/2}, ${width}, ${height}`)
            .attr("style", "width: 100%; height: auto;")
            

// let myData = d3.tsv("data/naraaziza/raw-tab.tsv").then((data) => {
let myData = Promise.all([
        d3.tsv("data/images_all.tsv"),
        d3.tsv("data/naraaziza/nara-words.tsv"),
        d3.tsv("data/willow.allen/willow-words.tsv"),
        d3.tsv("data/sarah_wildmothering/sarah-words.tsv"),
        d3.tsv("data/brookeraybould/brooke-words.tsv"),
        d3.tsv("data/naraaziza/nara-emoji.tsv"),
        d3.tsv("data/willow.allen/willow-emoji.tsv"),
        d3.tsv("data/sarah_wildmothering/sarah-emoji.tsv"),
        d3.tsv("data/brookeraybould/brooke-emoji.tsv"),
        d3.tsv("data/naraaziza/nara-brands.tsv"),
        d3.tsv("data/willow.allen/willow-brands.tsv"),
        d3.tsv("data/sarah_wildmothering/sarah-brands.tsv"),
        d3.tsv("data/brookeraybould/brooke-brands.tsv"),
        ]).then((sep_data) => {
    
    // let smallData = data.slice(0, 200)
    const influencers = ["naraaziza", "willow.allen", "brookeraybould", "sarah_wildmothering", "none"]

    var data = []
    sep_data.forEach((table, i) => {
        // console.log(table)
        data = data.concat(table)
    })

    var rangeSize = [width*0.05,width*0.10]
    var wordRange = [width*0.015,width*0.03]
    var emojiRange = [width*0.03,width*0.05]

    // redo this part some time: 
    var extentNara = d3.extent(data.filter(i => i.author == "naraaziza" && i.num_comments), function(d){return +d.num_comments})
    var scaleNara = d3.scaleLinear().domain(extentNara).range(rangeSize)
    var extentBrooke = d3.extent(data.filter(i => i.author == "brookeraybould" && i.num_comments), function(d){return +d.num_comments})
    var scaleBrooke = d3.scaleLinear().domain(extentBrooke).range(rangeSize)
    var extentSarah = d3.extent(data.filter(i => i.author == "sarah_wildmothering" && i.num_comments), function(d){return +d.num_comments})
    var scaleSarah = d3.scaleLinear().domain(extentSarah).range(rangeSize)
    var extentWillow = d3.extent(data.filter(i => i.author == "willow.allen" && i.num_comments), function(d){return +d.num_comments})
    var scaleWillow = d3.scaleLinear().domain(extentWillow).range(rangeSize)

    var extentNaraW = d3.extent(data.filter(i => i.author == "naraaziza" && i.word), function(d){return +d.value})
    var scaleNaraW = d3.scaleLinear().domain(extentNaraW).range(wordRange)
    var extentBrookeW = d3.extent(data.filter(i => i.author == "brookeraybould" && i.word), function(d){return +d.value})
    var scaleBrookeW = d3.scaleLinear().domain(extentBrookeW).range(wordRange)
    var extentSarahW = d3.extent(data.filter(i => i.author == "sarah_wildmothering" && i.word), function(d){return +d.value})
    var scaleSarahW = d3.scaleLinear().domain(extentSarahW).range(wordRange)
    var extentWillowW = d3.extent(data.filter(i => i.author == "willow.allen" && i.word), function(d){return +d.value})
    var scaleWillowW = d3.scaleLinear().domain(extentWillowW).range(wordRange)

    var extentNaraE = d3.extent(data.filter(i => i.author == "naraaziza" && i.unicode_scalar), function(d){return +d.frequency})
    var scaleNaraE = d3.scaleLinear().domain(extentNaraE).range(emojiRange)
    var extentBrookeE = d3.extent(data.filter(i => i.author == "brookeraybould" && i.unicode_scalar), function(d){return +d.frequency})
    var scaleBrookeE = d3.scaleLinear().domain(extentBrookeE).range(emojiRange)
    var extentSarahE = d3.extent(data.filter(i => i.author == "sarah_wildmothering" && i.unicode_scalar), function(d){return +d.frequency})
    var scaleSarahE = d3.scaleLinear().domain(extentSarahE).range(emojiRange)
    var extentWillowE = d3.extent(data.filter(i => i.author == "willow.allen" && i.unicode_scalar), function(d){return +d.frequency})
    var scaleWillowE = d3.scaleLinear().domain(extentWillowE).range(emojiRange)

    data.forEach((d,i) => {
        if(d.num_comments && d.image){
            if(d.author == "naraaziza"){
                const radiusNara = scaleNara(d.num_comments); d.radius = radiusNara;
            } else if (d.author == "brookeraybould"){
                const radiusBrooke = scaleBrooke(d.num_comments); d.radius = radiusBrooke;
            } else if (d.author == "sarah_wildmothering"){
                const radiusSarah = scaleSarah(d.num_comments); d.radius = radiusSarah;
            } else if (d.author == "willow.allen"){
                const radiusWillow = scaleWillow(d.num_comments); d.radius = radiusWillow;
            }
        }
        if(d.word){
            if(d.author == "naraaziza"){
                const radiusNara = scaleNaraW(d.value); d.radius = radiusNara;
            } else if (d.author == "brookeraybould"){
                const radiusBrooke = scaleBrookeW(d.value); d.radius = radiusBrooke;
            } else if (d.author == "sarah_wildmothering"){
                const radiusSarah = scaleSarahW(d.value); d.radius = radiusSarah;
            } else if (d.author == "willow.allen"){
                const radiusWillow = scaleWillowW(d.value); d.radius = radiusWillow;
            }
        }
        if(d.unicode_scalar){
            if(d.author == "naraaziza"){
                const radiusNara = scaleNaraE(d.frequency); d.radius = radiusNara;
            } else if (d.author == "brookeraybould"){
                const radiusBrooke = scaleBrookeE(d.frequency); d.radius = radiusBrooke;
            } else if (d.author == "sarah_wildmothering"){
                const radiusSarah = scaleSarahE(d.frequency); d.radius = radiusSarah;
            } else if (d.author == "willow.allen"){
                const radiusWillow = scaleWillowE(d.frequency); d.radius = radiusWillow;
            }
        }
        
    })

    // next time -> group by brand as well?, now height-based conditions are too complicated to redo
    const groups = d3.group(data, (d) => d.author)

    const root = d3.hierarchy(groups)
    const linkData = root.links();
    const nodeData = root.descendants();

    nodeData.forEach((node, i) => {
        if(node.data.word){
            let radius = 0
            nodeData.forEach((word) => {
                    if(word.data.word === node.data.word && node != word){
                        radius = radius + node.data.radius
                        nodeData.splice(i, 1)
                        word.data.radius = radius
                        word.data.author = "none"
                        linkData.push({"source": node.parent, "target": word, "index": linkData.length+i+1})
                    }
            })
        }
        if(node.data.unicode_scalar){
            let radius = 0
            nodeData.forEach((emoji) => {
                    if(emoji.data.unicode_scalar === node.data.unicode_scalar && node != emoji){
                        radius = radius + node.data.radius
                        nodeData.splice(i, 1)
                        emoji.data.radius = radius
                        emoji.data.author = "none"
                        linkData.push({"source": node.parent, "target": emoji, "index": linkData.length+i+1})
                    }
            })
        }
    })

    var centroids = {};
    centroids["naraaziza"] = {x: width*0.75, y: height*0.25}
    centroids["brookeraybould"] = {x: width*0.25, y: height*0.25}
    centroids["sarah_wildmothering"] = {x: width*0.25, y: height*0.75}
    centroids["willow.allen"] = {x: width*0.75, y: height*0.75}
    centroids["none"] = {x: width/2, y: height/2}

    // console.log(linkData , nodeData)
    
    // var extentComments = d3.extent(data, function(d){return +d.num_comments})
    // var scaleComments = d3.scaleLinear().domain(extentComments).range([20,100])

    const simulation = d3.forceSimulation(nodeData)
        .force("link", d3.forceLink(linkData).id((d) => d.id).strength((link) => {
            // console.log(link.source, link.target)
            // if(link.source.depth == 0){
            //     return 0
            // } 
            // else { return 3 }

            // if(link.target.depth > 1){
            //     return 10
            // } else {
            //     return 2
            // }
            // return 1
            // if(link.source.depth == 0){
            //     return 0.1
            // }
            if(link.source.data[0] == link.target.data.author){
                return 0.9
            } else {
                return 0.01
            }
        }))
        .force("charge", d3.forceManyBody().strength(-30))
        .force("collision", d3.forceCollide().radius(
            (d) => {
            
            if(d.height == 1){return 30}
            else{return 10}
            // else if(d.data.word){
            //     switch(d.data.author){
            //         case "naraaziza": return scaleNaraW(d.data.value)*3
            //         case "brookeraybould": return scaleBrookeW(d.data.value)*3
            //         case "sarah_wildmothering": return scaleSarahW(d.data.value)*3
            //         case "willow.allen": return scaleWillowW(d.data.value)*3
            // }}
            // else if(d.data.image && d.height == 0){
            //     switch(d.data.author){
            //         case "naraaziza": return scaleNara(d.data.num_comments)
            //         case "brookeraybould": return scaleBrooke(d.data.num_comments)
            //         case "sarah_wildmothering": return scaleSarah(d.data.num_comments)
            //         case "willow.allen": return scaleWillow(d.data.num_comments)
            //     }
            // }
            }
        ))
        .force("center", d3.forceCenter(width/2, height/2))
        .force("x", d3.forceX().x((d) => {
            if(d.data.author){
                return centroids[d.data.author].x
            // switch(d.data.author){
            //         case "naraaziza": return width*0.3
            //         case "brookeraybould": return width*0.3
            //         case "sarah_wildmothering": return width*0.6
            //         case "willow.allen": return width*0.6
            //         case "none": return width/2
            //     }
            } else { return width/2}
        }))
        .force("y", d3.forceY().y((d) => {
            if(d.data.author){
                return centroids[d.data.author].y
            // switch(d.data.author){
            //         case "naraaziza": return height*0.3
            //         case "brookeraybould": return height*0.6
            //         case "sarah_wildmothering": return height*0.3
            //         case "willow.allen": return height*0.6
            //         case "none": return height/2
            //     }
            } else {return height/2}
        }))

    
    let links = svg.append("g")
                    .attr("class", "links")
    let nodes = svg.append("g")
                    .attr("class", "nodes")
    let names = svg.append("g")
                    .attr("class", "names")

    let nameData = nodeData.filter((item) => item.height == 1 && item.data[0] != undefined && item.data[0] != "")

    let redraws = 0;


    function drawData(dataKind){


        let newNodeData = nodeData.filter((d) => d.data.hasOwnProperty(dataKind))
        let newLinkData = linkData.filter((d) => d.target.data.hasOwnProperty(dataKind))

        simulation.force("collision", d3.forceCollide().radius(
            (d) => {
            
            if(d.height == 1){return 30}
            else if(dataKind == "word" && d.height == 0){ 
                if(d.data.value){return d.data.radius*2}
                // switch(d.data.author){
                //     case "naraaziza": console.log(scaleNaraW(d.data.value)*2, d.data.radius*2); return scaleNaraW(d.data.value)*2
                //     case "brookeraybould": return scaleBrookeW(d.data.value)*2
                //     case "sarah_wildmothering": return scaleSarahW(d.data.value)*2
                //     case "willow.allen": return scaleWillowW(d.data.value)*2
                // }
            }
            else if(dataKind == "image" && d.height == 0){ if(d.data.image){return d.data.radius/1.2}
                // switch(d.data.author){
                //     case "naraaziza": return scaleNara(d.data.num_comments)
                //     case "brookeraybould": return scaleBrooke(d.data.num_comments)
                //     case "sarah_wildmothering": return scaleSarah(d.data.num_comments)
                //     case "willow.allen": return scaleWillow(d.data.num_comments)
                // }
            }
            else if(dataKind == "unicode_scalar" && d.height == 0){
                if(d.data.unicode_scalar){return d.data.radius}
                // switch(d.data.author){
                //     case "naraaziza": return scaleNaraE(d.data.frequency)
                //     case "brookeraybould": return scaleBrookeE(d.data.frequency)
                //     case "sarah_wildmothering": return scaleSarahE(d.data.frequency)
                //     case "willow.allen": return scaleWillowE(d.data.frequency)
                // }
            } else if(dataKind == "brand" && d.height == 0){
                if(d.data.brand){return rangeSize[0]}
            }
            }
        ))

        let link = links.selectAll("line")
                        .data(newLinkData)
                        .join(
                            function(enter){
                                return enter.append("line")},
                            // function(update){
                                // console.log(update)
                                // return update.append("line")},
                            // function(exit){return exit.remove()}
                        )
                        .attr("stroke-width", 
                            (d) => {
                                if(!d.target.x){return "0px"}
                                else{return "1px"}
                                // switch(dataKind){
                                //     case "image": return "1px"
                                //     case "word": return "1px"
                                //     case "unicode_scalar": return "1px"
                                //     case ""
                                // }})
                                })
                            .attr("fill", "none")
                            .attr("stroke", (d) => {
                                switch(d.source.data[0]){
                                    case "naraaziza": return "#ffd8bacc"
                                    case "brookeraybould": return "#ffbad2cc"
                                    case "sarah_wildmothering": return "#a7c9a8cc"
                                    case "willow.allen": return "#a7b8c9cc"
                                }
                                return "black"
                            })
                            .attr("class", "node")

            document.getElementById("popup-close").addEventListener("click", function(e,d){this.parentElement.style.display = "none"})
       

            let node = nodes.selectAll(".nodes")
                            .data(newNodeData)
                            .join(
                                function(enter){
                                    if(dataKind == "image"){
                                    let img = enter.append("image")
                                            .attr("xlink:href", (d) => {if(d.height == 0) {if(d.data.image)return `data/${d.data.author}/img/${d.data.filename}`}})
                                            .attr("height", (d) => {return d.data.radius})
                                            .on("click", function(e,d){
                                                let img_path = `data/${d.data.author}/img/${d.data.filename}`
                                                // console.log(img_path) 

                                                d3.select("#post-popup")
                                                    .style("display", "block")
                                                    // .style("top", `${e.pageY+20}px`)
                                                    // .style("left", `${e.pageX+20}px`)
                                                
                                                document.getElementById("popup-img").src = img_path

                                                d3.select("#popup-text")
                                                    .html(`<b>${d.data.author}</b> ${d.data.body}`)
                                            })
                                            return img
                                        }
                                    if(dataKind == "word"){
                                        let word = enter.append("text")
                                                        .text((d) => {return d.data.word})
                                                        .attr("text-anchor", "middle")
                                                        .attr("stroke", "yellow")
                                                        .attr("stroke-width", "5px")
                                                        .attr("paint-order", "stroke")
                                                        .style("font-size", (d) => {
                                                            return d.data.radius
                                                            // switch(d.data.author){
                                                            //     case "naraaziza": return (scaleNaraW(d.data.value))
                                                            //     case "brookeraybould": return (scaleBrookeW(d.data.value))
                                                            //     case "sarah_wildmothering": return (scaleSarahW(d.data.value))
                                                            //     case "willow.allen": return (scaleWillowW(d.data.value))
                                                            //     case "none": return d.data.radius
                                                            // }
                                                        })
                                            return word
                                    }
                                    if(dataKind == "unicode_scalar"){
                                        let emoji = enter.append("text")
                                                        .html((d) => {let text = d.data.unicode_scalar.replace("+", ";&#x"); return `&#x${text};`})
                                                        .attr("text-anchor", "middle")
                                                        .style("font-size", (d) => {return d.data.radius
                                                            // switch(d.data.author){
                                                            //     case "naraaziza": return (scaleNaraE(d.data.frequency))
                                                            //     case "brookeraybould": return (scaleBrookeE(d.data.frequency))
                                                            //     case "sarah_wildmothering": return (scaleSarahE(d.data.frequency))
                                                            //     case "willow.allen": return (scaleWillowE(d.data.frequency))
                                                            //     case "none": return (scaleWillowE(d.data.value))
                                                            // }
                                                        })
                                            return emoji
                                    }
                                    if(dataKind == "brand"){
                                        let brand = enter.append("image")
                                           .attr("xlink:href", (d) => {if(d.height == 0) {if(d.data.filename)return `data/${d.data.author}/img/${d.data.filename}`}})
                                            .attr("height", (d) => {return rangeSize[0]})
                                            .on("click", function(e,d){
                                                let img_path = `data/${d.data.author}/img/${d.data.filename}`
                                                // console.log(img_path) 

                                                d3.select("#post-popup")
                                                    .style("display", "block")
                                                    // .style("top", `${e.pageY+20}px`)
                                                    // .style("left", `${e.pageX+20}px`)
                                                
                                                document.getElementById("popup-img").src = img_path

                                                d3.select("#popup-text")
                                                    .html(`<i>${d.data.brand} / ${d.data.ig_handle}</i><br/><b>${d.data.author}</b> ${d.data.body}`)
                                            })
                                            return brand
                                    }
                                //     }
                                // })
                            },
                                function(exit){return exit.remove()}
                            )
                            .attr("class", "node")
                            .call(drag(simulation))
                            
                    let circle = nodes.selectAll(".nodes")
                                .data(newNodeData)
                                .enter().append("circle")
                                    .attr("r", (d)=> {
                                       if(dataKind == "image"){return d.data.radius/2}
                                       else if(dataKind == "brand"){return rangeSize[0]/2}
                                       else{return d.data.radius/1.3}
                                    })
                                    .attr("fill", (d) => {return "none"})
                                    .attr("stroke", (d) => {
                                        if(dataKind == "image" || dataKind == "brand"){return "white"}
                                        else {return "black"}})
                                    .attr("stroke-width", 2)
                                    .attr("stroke-dasharray", ("2", "2"))
                                    .attr("class", "node")
                                            

            let name = names.selectAll(".names")
                        .data(nameData)
                        .join(function(enter){
                            return enter.append("text")
                                                          .html((d) => {return "@"+d.data[0]})},
                            function(update){return update.html((d) => {return "@"+d.data[0]})},
                            function(exit){return exit.remove()}
                        )
                        .attr("stroke", "white")
                        .attr("stroke-width", "5px")
                        .attr("paint-order", "stroke")
                        .attr("fill", "black")
                        .style("text-anchor", "middle")
                        .style("font-size", 30)
                        .attr("class", "name node")
                     

            simulation.on("tick", ticked)

            // if(redraws < 1){
            //     simulation.alpha(1).restart()}
            // else{
            //     simulation.alpha(0.005).restart()
            // }
            simulation.alpha(0.01).restart()
            
            function ticked() {

                var alpha = this.alpha();
                var nodes = this.nodes();

                var coords = {};
                var groups = [];

                // node.each(function(d) {
                    // if(groups.indexOf(d.data.author) == -1){
                    //     groups.push(d.data.author);
                    //     coords[d.data.author] = [];
                    // }

                    // coords[d.data.author].push({x:d.x, y:d.y})
                    
                // })

                

                // for(var group in coords){
                //     var groupNodes = coords[group]
                //     var n = groupNodes.length;
                //     var cx = 0;
                //     var tx = 0;
                //     var cy = 0;
                //     var ty = 0;

                //     groupNodes.forEach(function(d) {
                //         tx += d.x;
                //         ty += d.y;
                //     })
                //     cx = tx/n;
                //     cy = ty/n;

                //     centroids[group] = {x: cx, y: cy}
                // }

                var minDistance = 5;
                // if (alpha < 0.1) {
                //     minDistance = 10 + (1000 * (0.1-alpha))
                // }

                node.each(function(d){
                    var cx = centroids[d.data.author].x;
                    var cy = centroids[d.data.author].y;
                    var x = d.x;
                    var y = d.y;
                    var dx = cx - x;
                    var dy = cy - y;

                    var r = Math.sqrt(dx*dx+dy*dy)

                    if(r>minDistance){
                        d.x = x * 0.9 + cx * 0.1;
                        d.y = y * 0.9 + cy * 0.1;
                    }
                })

                // name.each(function(d,i){            
                //     var cx = centroids[d.data[0]].x;
                //     var cy = centroids[d.data[0]].y;
                //     var x = d.x;
                //     var y = d.y;
                //     var dx = cx - x;
                //     var dy = cy - y;

                //     var r = Math.sqrt(dx*dx+dy*dy)

                //     if(r>minDistance){
                //         d.x = x * 0.9 + cx * 0.1;
                //         d.y = y * 0.9 + cy * 0.1;
                //     }
                // })

                // link.attr("d", function(d) {
                    // console.log(d)
                            // var dx = d.target.x - d.source.x,
                            // dy = d.target.y - d.source.y,
                            // dr = Math.sqrt(dx * dx + dy * dy);
                            // return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
                    
                // })
                link.attr("x1", d => {
                    // if(d.index <10){console.log(d.source)}
                    if (d.source.height == 1){
                        return centroids[d.source.data[0]].x
                        // switch(d.source.data[0]){
                        //     case "naraaziza": return width*0.25
                        //     case "brookeraybould": return width*0.25
                        //     case "sarah_wildmothering": return width*0.75
                        //     case "willow.allen": return width*0.75
                        // }
                    } else{
                        return d.source.x
                    }
                })
                .attr("x2", d => d.target.x)
                .attr("y1", d => {
                    // if(d.index <10){console.log(d.source)}
                    if (d.source.height == 1){
                        return centroids[d.source.data[0]].y
                        // switch(d.source.data[0]){
                        //     case "naraaziza": return height*0.25
                        //     case "brookeraybould": return height*0.75
                        //     case "sarah_wildmothering": return height*0.25
                        //     case "willow.allen": return height*0.75
                        // }
                    } else{
                        return d.source.y
                    }
                })
                .attr("y2", d => d.target.y)
                // d3.selectAll(".node")
                // //    .attr("cx", d => d.x)
                // //    .attr("cy", d => d.y)
                // .attr("x", d => d.x)
                // .attr("y", d => d.y);

                node.attr("x", d => d.x)
                    .attr("y", d => d.y)
                    // .attr("cx", d => d.x)
                    // .attr("cy", d => d.y)
                
                circle
                    .attr("cx", d => {if(dataKind == "image"){return d.x + d.data.radius/2}
                                        else if(dataKind == "brand"){return d.x + rangeSize[0]/2}
                                        else{return d.x}})
                    .attr("cy", d => {if(dataKind == "image"){return d.y + d.data.radius/2}
                                      else if(dataKind == "unicode_scalar"){return d.y - d.data.radius/3}
                                      else if(dataKind == "brand"){return d.y + rangeSize[0]/2}
                                        else{return d.y - d.data.radius/4}})

                // name.attr("x", d => d.x)
                //     .attr("y", d => d.y)

                name.attr("x", (d) => {
                    return centroids[d.data[0]].x
                    // switch(d.data[0]){
                    //     case "naraaziza": return width*0.25
                    //     case "brookeraybould": return width*0.25
                    //     case "sarah_wildmothering": return width*0.75
                    //     case "willow.allen": return width*0.75
                    // }
                })
                .attr("y", (d) => {
                    return centroids[d.data[0]].y
                    // switch(d.data[0]){
                    //     case "naraaziza": return height*0.25
                    //     case "brookeraybould": return height*0.75
                    //     case "sarah_wildmothering": return height*0.25
                    //     case "willow.allen": return height*0.75
                    // }
                })
                }

            function drag(simulation){
                function dragstarted(event){
                    if(!event.active) {simulation.alphaTarget(0.01).restart();}
                    event.subject.fx = event.subject.x;
                    event.subject.fy = event.subject.y
                }
                function dragged(event){
                    event.subject.fx = event.x;
                    event.subject.fy = event.y;
                }
                function dragended(event){
                    if(!event.active) simulation.alphaTarget(0);
                    event.subject.fx = null;
                    event.subject.fy = null;
                }
                return d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
            }
    }

    let datasets = ["image", "word", "unicode_scalar", "brand"]

    drawData(datasets[0])

    initZoom();

    d3.select("#nextDataset").on("click",function(){
        svg.selectAll(".node").remove()
        redraws += 1;
        if(redraws >= datasets.length){redraws = 0}
        drawData(datasets[redraws])
    })
    d3.select("#one").on("click",function(){
        svg.selectAll(".node").remove()
        drawData(datasets[0])
    })
    d3.select("#two").on("click",function(){
        svg.selectAll(".node").remove()
        drawData(datasets[1])
    })
    d3.select("#three").on("click",function(){
        svg.selectAll(".node").remove()
        drawData(datasets[2])
    })
    d3.select("#four").on("click",function(){
        svg.selectAll(".node").remove()
        drawData(datasets[3])
    })

    let isMouseHover = false
    let block = document.getElementById("post-popup")
    let allnodes = document.getElementsByClassName("node")
    block.addEventListener("mouseleave", function(e){isMouseHover = false; console.log("no hover")})
    block.addEventListener("mouseover", function(e){isMouseHover = true; console.log("hover")})
    // let blockd3 = d3.select("#post-popup")
    // block.on("mouseenter", () => {isMouseHover = true; console.log("hover")}).on("mouseleave", () => {isMouseHover = false; console.log("no hover")})
    // svg.on("click", function(e,d){
    //     // console.log(block)
    //     if(!(e.target === block) && !(e.target === allnodes) && !isMouseHover){
    //         console.log("click outside")
    //     } else{
    //         console.log("click inside")
    //     }
    //     // if(block.style.display == "block"){
    //     //     block.style.display = "none"
    //     //     console.log("vlock")
    //     // }
    // })
    
})


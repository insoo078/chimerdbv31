/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var ChimeraDbV3ViewerWithOutChromosome = function( config, gene1, gene2 ) {
    this.config = JSON.parse( JSON.stringify(config) );
	
	console.log( gene1 );
	this.drawCanvas(this.config);
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawCanvas = function(config) {
	var canvas = d3.select(config.container)
			.append("svg")
			.attr("id", "canvas")
			.attr("width", "100%")
			.attr("height", "200");
	
	var first = canvas.append("g");
	var second = canvas.append("g");
	
	var gene5PLabel = first.append("rect")
			.attr("id", "5pGene")
			.attr("class", "fusion-gene-label")
			.attr("x", 10)
			.attr("y", 10)
			.attr("width", 100 )
			.attr("height", 20 )
			.attr("fill", "none")
			.attr("border", "1")
			.attr("stroke", "gray")
			;
			
	first.append("text")
			.style("font-size", "14px")
			.attr("text-ancor", "middle")
			.attr("transform", function(d) {
				var diff = gene5PLabel.node().getBoundingClientRect().top - canvas.node().getBoundingClientRect().top;
		
				var height = (gene5PLabel.node().getBoundingClientRect().height + diff)/2;

				return "translate(" + 10 + "," + (height+10) + ")";
			})
			.text('hello');
			
	var gene3PLabel = second.append("rect")
			.attr("id", "3pGene")
			.attr("class", "fusion-gene-label")
			.attr("x", 1000 )
			.attr("y", 10)
			.attr("width", 100 )
			.attr("height", 20 )
			.attr("fill", "none")
			.attr("border", "1")
			.attr("stroke", "gray")
			;

	second.append("text")
			.style("font-size", "14px")
			.attr("width", 50)
			.attr("text-ancor", "middle")
			.attr("transform", function(d) {
				var diff = gene3PLabel.node().getBoundingClientRect().top - canvas.node().getBoundingClientRect().top;
		
				var height = (gene3PLabel.node().getBoundingClientRect().height + diff)/2;
				return "translate(" + 1000 + "," + (height+10) + ")";
			})
			.text('test2');

//	gene5PLabel.append("text").data('hello').enter().text(function(d){return d;});
};
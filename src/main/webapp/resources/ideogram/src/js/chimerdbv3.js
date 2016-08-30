/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var ChimeraDbV3ViewerWithOutChromosome = function( config, gene1, gene2 ) {
    this.config = JSON.parse( JSON.stringify(config) );
	
	var canvas = this.drawCanvas(this.config);
	this.drawEachGeneAreaLabel( this.config, canvas );
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawEachGeneAreaLabel = function(config, canvas) {
	var labelWidth= 100;
	var labelHeight= 30;
	
	var canvasRect = d3.select(config.container).node().getBoundingClientRect();


	var first = canvas.append("g");
	var second = canvas.append("g");
	
	var data = [{widh:100,height:30,id:'5pGene',label:"5' Gene"}, {width:100,height:30,id:'3pGene',label:"3' Gene"}];

	var gene5PLabel = first.append("rect")
			.attr("id", data[0].id)
			.attr("class", "fusion-gene-label")
			.attr("transform", function(d){
				return "translate(" + config.sideMargin + "," + config.sideMargin + ")";
			})
			.attr("width", labelWidth )
			.attr("height", labelHeight )
			.attr("fill", "none")
			.attr("border", "1")
			.attr("stroke", "gray")
			;
			
	first.append("text")
			.style("font-size", "14px")
			.attr("text-anchor", "middle")
			.attr("transform", function(d) {
				var diff = gene5PLabel.node().getBoundingClientRect().top - canvas.node().getBoundingClientRect().top;

				var height = (gene5PLabel.node().getBoundingClientRect().height + diff)/2;
				
				var center = gene5PLabel.node().getBoundingClientRect().width/2 + config.sideMargin;

				return "translate(" + center + "," + (height+config.sideMargin) + ")";
			})
			.text("5' Gene");

	var gene3PLabel = second.append("rect")
			.attr("id", data[1].id)
			.attr("class", "fusion-gene-label")
			.attr("transform", function(d){
				return "translate(" + (canvasRect.width - (labelWidth + config.sideMargin)) + "," + config.sideMargin + ")";
			})
			.attr("width", labelWidth )
			.attr("height", labelHeight )
			.attr("fill", "none")
			.attr("border", "1")
			.attr("stroke", "gray")
			;

	second.append("text")
			.style("font-size", "14px")
			.attr("text-anchor", "middle")
			.attr("transform", function(d) {
				var diff = gene3PLabel.node().getBoundingClientRect().top - canvas.node().getBoundingClientRect().top;
		
				var height = (gene3PLabel.node().getBoundingClientRect().height + diff)/2;
				
				var center = gene3PLabel.node().getBoundingClientRect().left - gene3PLabel.node().getBoundingClientRect().width - config.sideMargin;
				
				console.log( gene3PLabel.node().getBoundingClientRect().left );
				return "translate(" + center + "," + (height+10) + ")";
			})
			.text("3' Gene");
}

ChimeraDbV3ViewerWithOutChromosome.prototype.drawCanvas = function(config) {
	var canvasRect = d3.select(config.container).node().getBoundingClientRect();

	var canvas = d3.select(config.container)
			.append("svg")
			.attr("id", "canvas")
			.attr("width", canvasRect.width)
			.attr("height", "200");

	return canvas;
};
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var ChimeraDbV3ViewerWithOutChromosome = function( config, gene1, gene2 ) {
    this.config = JSON.parse( JSON.stringify(config) );

	var canvas = this.drawCanvas(this.config);

	var genePanelJson = [{name:'#fusion-gene-label-group-5p', gene:gene1}, {name:'#fusion-gene-label-group-3p', gene:gene2}];

	this.initLayout( this.config );
	this.drawEachGeneAreaLabel( this.config, gene1, gene2, canvas );
	for(var i=0; i<genePanelJson.length; i++) {
		this.drawGeneLabel( this.config, genePanelJson[i].name, genePanelJson[i].gene );
		this.drawMessagerRnaIdLabel( this.config, genePanelJson[i].name, genePanelJson[i].gene );
		this.drawChromosomeLabel( this.config, genePanelJson[i].name, genePanelJson[i].gene );
	}

	this.drawGeneStructure( this.config, genePanelJson, canvas );
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawGeneStructure = function( config, genePanelJson, canvas ) {
	var gene_total_length = 0;
	for(var i=0; i<genePanelJson.length; i++)
		gene_total_length += genePanelJson[i].gene.geneFeature.end - genePanelJson[i].gene.geneFeature.start + 1;

	var LEFT_MARGIN = 150;
	for(var i=0; i<genePanelJson.length; i++) {
		var gene_length = genePanelJson[i].gene.geneFeature.end - genePanelJson[i].gene.geneFeature.start + 1;
		var gene_length_ratio = gene_length / gene_total_length;
		
		var drawCanvas = d3.selectAll(".fusion-gene-panel");
		var geneBackbonLength = drawCanvas.node().getBoundingClientRect().width - LEFT_MARGIN;
		
		var stable_length = geneBackbonLength * 0.8;
		var variable_length = (geneBackbonLength * 0.2) * gene_length_ratio;
		
		var final_length = stable_length + variable_length;

		var startX = LEFT_MARGIN - (5*config.sideMargin);

		if( genePanelJson[i].name.endsWith("3p") )
			startX += drawCanvas.node().getBoundingClientRect().width;

		canvas.append('line')
			.attr("class", "gene-backbone")
			.attr('x1', startX)
			.attr('y1', 200)
			.attr('x2', startX + final_length)
			.attr("y2", 200)
			.attr("style", "stroke:#555;stroke-width:5;");
	
	
		var exonLength = 0;
		var transcriptExons = genePanelJson[i].gene.transcripts[0].exons;
		for(var j=0; j<transcriptExons.length; j++){
			exonLength += transcriptExons[j].end - transcriptExons[j].start + 1;
		}
		
		var unitNtSize = final_length / transcriptExons.length;
		
		var exonNtSize = (unitNtSize * 0.8) / transcriptExons.length;

		var intronNtSize = (unitNtSize * 0.2) / (transcriptExons.length+1);

		console.log( exonLength + "/" + gene_length + "  and No of exons : " + transcriptExons.length + " " + unitNtSize + " (" + exonNtSize + ", " + intronNtSize + ")");
	}
	
//	console.log( gene_total_length );
	console.log( genePanelJson[0].gene );
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawChromosomeLabel = function(config, className, gene) {
	var labelGroup = d3.selectAll( className );	
		labelGroup.append("text")
		.style("font-size", "14px")
		.attr("class", "chromosome-label")
		.attr("text-anchor", "middle")
		.attr("dominant-baseline", "central")
		.attr("transform", function(d) {
			var areaLabel = labelGroup.select(".fusion-gene-label");
			var geneLabel = labelGroup.select(".gene-name-label");
			var rect = areaLabel.node().getBoundingClientRect();
			var geneLableRect = geneLabel.node().getBoundingClientRect();
			
			var base = d3.select(config.container).node().getBoundingClientRect();

			return "translate(" + (rect.left-base.left+(rect.width/2)) + "," + (geneLableRect.bottom - base.top + (2*config.sideMargin)) + ")";
		})
		.text("Chromosome " + gene.chromosome);
}

ChimeraDbV3ViewerWithOutChromosome.prototype.drawGeneLabel = function(config, className, gene) {
	var labelGroup = d3.selectAll( className );

		labelGroup.append("text")
		.style("font-size", "14px")
		.attr("class", "gene-name-label")
		.attr("text-anchor", "middle")
		.attr("dominant-baseline", "central")
		.attr("transform", function(d) {
			var areaLabel = labelGroup.select(".fusion-gene-label");
			var rect = areaLabel.node().getBoundingClientRect();

			var base = d3.select(config.container).node().getBoundingClientRect();

			if( className.endsWith('5p') ) {
				return "translate(" + (rect.left-base.left+(rect.width/2)) + "," + (rect.bottom - base.top + (2*config.sideMargin)) + ")";
			}else {
				return "translate(" + (rect.left-base.left+(rect.width/2) - 100) + "," + (rect.bottom - base.top + (2*config.sideMargin)) + ")";
			}
		})
		.text(gene.symbol);
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawMessagerRnaIdLabel = function(config, className, gene) {
	var labelGroup = d3.selectAll( className );	
		labelGroup.append("text")
		.style("font-size", "14px")
		.attr("class", "mirna-name-label")
		.attr("text-anchor", "middle")
		.attr("dominant-baseline", "central")
		.attr("transform", function(d) {
			var areaLabel = labelGroup.select(".gene-name-label");
			var rect = areaLabel.node().getBoundingClientRect();

			var base = d3.select(config.container).node().getBoundingClientRect();

			var y1 = (rect.top - base.top) + (rect.height / 2) - 2;

			return "translate(" + (rect.left-base.left+(rect.width/2) + 80) + "," + y1 + ")";
		})
		.text(gene.transcripts[0].attributesMap.Name);
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawEachGeneAreaLabel = function(config, gene1, gene2, canvas) {
	var canvasRect = d3.select(config.container).node().getBoundingClientRect();

	var first = canvas.append("g")
			.attr("id", "fusion-gene-label-group-5p");
	var second = canvas.append("g")
			.attr("id", "fusion-gene-label-group-3p");
	
	var data = [{width:100,height:30,id:'5pGene',label:"5' Gene"}, {width:100,height:30,id:'3pGene',label:"3' Gene"}];

	var gene5PLabel = first.append("rect")
			.attr("id", data[0].id)
			.attr("class", "fusion-gene-label")
			.attr("transform", function(d){
				return "translate(" + (5*config.sideMargin) + "," + config.sideMargin + ")";
			})
			.attr("width", data[0].width )
			.attr("height", data[0].height )
			.attr("fill", "none")
			.attr("border", "1")
			.attr("stroke", "gray")
			.style("stroke-dasharray", ("2,3"))
			;
			
	first.append("text")
			.style("font-size", "14px")
			.attr("text-anchor", "middle")
			.attr("transform", function(d) {
				var diff = gene5PLabel.node().getBoundingClientRect().top - canvas.node().getBoundingClientRect().top;

				var height = (gene5PLabel.node().getBoundingClientRect().height + diff)/2;
				
				var center = gene5PLabel.node().getBoundingClientRect().width/2 + (5*config.sideMargin);

				return "translate(" + center + "," + (height+config.sideMargin) + ")";
			})
			.text("5' Gene");

	var gene3PLabel = second.append("rect")
			.attr("id", data[1].id)
			.attr("class", "fusion-gene-label")
			.attr("transform", function(d){
				return "translate(" + (canvasRect.width - (data[1].width + (5*config.sideMargin))) + "," + config.sideMargin + ")";
			})
			.attr("width", data[1].width )
			.attr("height", data[1].height )
			.attr("fill", "none")
			.attr("border", "1")
			.attr("stroke", "gray")
			.style("stroke-dasharray", ("2,3"))
			;

	second.append("text")
			.style("font-size", "14px")
			.attr("text-anchor", "middle")
			.attr("transform", function(d) {
				var diff = gene3PLabel.node().getBoundingClientRect().top - canvas.node().getBoundingClientRect().top;
		
				var height = (gene3PLabel.node().getBoundingClientRect().height + diff)/2;

				var center = canvasRect.width - (data[1].width/2) - (5*config.sideMargin);

				return "translate(" + center + "," + (height+10) + ")";
			})
			.text("3' Gene");
}

ChimeraDbV3ViewerWithOutChromosome.prototype.initLayout = function(config) {
	var canvas = d3.select("#canvas");
	var base = canvas.node().getBoundingClientRect();
	
	canvas.append("rect")
			.attr("id", "fusion-gene-top-panel-5p")
			.attr("class", "fusion-gene-top-panel")
			.attr("width", base.width/2)
			.attr("height", config.explainTopPanelHeight)
			.attr("fill", "none")
			.attr("x", 0)
			.attr("y", 0);
	
	canvas.append("rect")
			.attr("id", "fusion-gene-top-panel-3p")
			.attr("class", "fusion-gene-top-panel")
			.attr("width", base.width/2)
			.attr("height", config.explainTopPanelHeight)
			.attr("fill", "none")
			.attr("x", base.width/2)
			.attr("y", 0);
	
	var panel5p = canvas.append("rect")
			.attr("id", "fusion-gene-5p-area")
			.attr("class", "fusion-gene-panel")
			.attr("width", base.width/2)
			.attr("height", base.height - config.explainTopPanelHeight)
			.attr("fill", "green")
			.attr("x", 0)
			.attr("y", config.explainTopPanelHeight);

	var panel3p = canvas.append("rect")
			.attr("id", "fusion-gene-3p-area")
			.attr("class", "fusion-gene-panel")
			.attr("width", base.width/2)
			.attr("height", base.height - config.explainTopPanelHeight)
			.attr("fill", "orange")
			.attr("x", base.width/2)
			.attr("y", config.explainTopPanelHeight);
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawCanvas = function(config) {
	var canvasRect = d3.select(config.container).node().getBoundingClientRect();

	var canvas = d3.select(config.container)
			.append("svg")
			.attr("id", "canvas")
			.attr("width", canvasRect.width)
			.attr("height", config.canvasHeight);

	return canvas;
};
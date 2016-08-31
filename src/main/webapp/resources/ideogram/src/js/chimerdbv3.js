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

	var fusionData = this.drawGeneStructure( this.config, genePanelJson, canvas, 3 );
	
	this.drawFusionGeneStructure( this.config, canvas, fusionData, 3 );
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawFusionGeneStructure = function( config, canvas, fusionData, drawingType ) {
	var fusion5p = fusionData["5'"];
	var fusion3p = fusionData["3'"];

	var fusion = [fusion5p, fusion3p];

	var gene_total_length = (fusion5p.endPos - fusion5p.startPos + 1) + (fusion3p.endPos - fusion3p.startPos + 1);
	var geneBackbonLength = 700;
	var startX = (canvas.node().getBoundingClientRect().width/2) - (geneBackbonLength/2);

	var backbone_color = ["#555", "#f7e"];
	for(var i=0; i<fusion.length; i++) {
		var gene_length = fusion[i].endPos - fusion[i].startPos + 1;
		var gene_length_ratio = gene_length / gene_total_length;

		var stable_length = ((geneBackbonLength/2) * 0.7);
		var variable_length = (((geneBackbonLength/2) * 0.3) * 2) * gene_length_ratio;

		var final_screen_gene_length = stable_length + variable_length;

		var backbone = canvas.append('line')
		.attr("class", "fusion-gene-backbone-5p")
		.attr('x1', startX)
		.attr('y1', 400)
		.attr('x2', startX + final_screen_gene_length )
		.attr("y2", 400)
		.attr("style", "stroke:"+backbone_color[i]+";stroke-width:5;");

		var wholeExonLength = 0;
		var transcriptExons = fusion[i].fusionStructure;
		for(var j=0; j<transcriptExons.length; j++){
			wholeExonLength += transcriptExons[j].end - transcriptExons[j].start + 1;
		}

		var wholeIntronLength = (wholeExonLength * 0.2) / 0.8;		// Fixed each intron size

		var final_gene_length = wholeExonLength + wholeIntronLength;			// modified gene length with shorten intron size
		var final_unit_nt_size = final_screen_gene_length / final_gene_length;	// calculate each nucleotide uni length

		var no_of_intron_size = wholeIntronLength / (transcriptExons.length+1);
		
		var x1 = startX;
		
		var exonLabelStartIdx = fusion[i].exonLabelStartIdx;
		for(var j=0; j<transcriptExons.length; j++){
			var realExonLength = transcriptExons[j].end - transcriptExons[j].start + 1;
			var onlyLength = 0;
			
			if( drawingType === 1 )
				onlyLength = realExonLength;
			else if( drawingType === 2 )
				onlyLength = wholeExonLength / transcriptExons.length;
			else if( drawingType === 3 ) {
				var ratio = realExonLength/(wholeExonLength/transcriptExons.length);
				var stable_length = (wholeExonLength / transcriptExons.length) * 0.7;
				var variable_length = ((wholeExonLength / transcriptExons.length) * 0.3) * ratio;
				
				onlyLength = stable_length + variable_length;
			}

			x1 += (1 * no_of_intron_size) * final_unit_nt_size;

			var exonColor = "orange";
			if( i === 0)	exonColor = "#33ff99";

			var width = onlyLength * final_unit_nt_size;
			var exon = canvas.append("rect")
				.attr("id", "exon-" + j)
				.attr("class", "exon-feature-label")
				.style("fill", exonColor)
				.style("stroke-width", 1)
				.style("stroke", "#bbb")
				.attr("rx", 2)
				.attr("ry", 2)
				.attr("x", x1)
				.attr("y", 390)
				.attr("width", width)
				.attr("height", 20);
		
			var exonRect = exon.node().getBoundingClientRect();

			canvas.append("text")
					.attr("text-anchor", "middle")
					.attr("dominant-baseline", "central")
					.attr("x", exonRect.left - canvas.node().getBoundingClientRect().left + exonRect.width/2)
					.attr("y", exonRect.top - canvas.node().getBoundingClientRect().top + exonRect.height/2)
					.text(exonLabelStartIdx+j);

			x1 += width;
		}

		try {
			var breakPointRect = d3.select(".break-point-"+fusion[i].fusionLocation).node().getBoundingClientRect();
			var baseRect = canvas.node().getBoundingClientRect();
			var backboneRect = backbone.node().getBoundingClientRect();

			canvas.append("line")
				.attr("x1", breakPointRect.left - baseRect.left)
				.attr("y1", breakPointRect.bottom - baseRect.top + 30)
				.attr("x2", fusion[i].fusionLocation === '5p'?backboneRect.right - baseRect.left:backboneRect.left - baseRect.left)
				.attr("y2", backboneRect.top - baseRect.top)
				.attr("style", "stroke:#00f;stroke-width:1;")
				.style("stroke-dasharray", ("2,3"));
		}catch(e) {
			console.log(e);
		}
		
		startX += final_screen_gene_length;
	}
};
	
ChimeraDbV3ViewerWithOutChromosome.prototype.drawGeneStructure = function( config, genePanelJson, canvas, drawingType ) {
	var gene_total_length = 0;
	for(var i=0; i<genePanelJson.length; i++)
		gene_total_length += genePanelJson[i].gene.geneFeature.end - genePanelJson[i].gene.geneFeature.start + 1;

	var fusionData = {};

	var LEFT_MARGIN = 100;
	for(var i=0; i<genePanelJson.length; i++) {
		var fusionFlag = genePanelJson[i].gene.fusionLocation==="5'"?"5p":"3p";

			
		var gene_length = genePanelJson[i].gene.geneFeature.end - genePanelJson[i].gene.geneFeature.start + 1;
		var gene_length_ratio = gene_length / gene_total_length;
		
		var drawCanvas = d3.selectAll(".fusion-gene-panel");
		var geneBackbonLength = drawCanvas.node().getBoundingClientRect().width - LEFT_MARGIN;
		
		var stable_length = geneBackbonLength * 0.95;
		var variable_length = (geneBackbonLength * 0.05) * gene_length_ratio;
		
		var final_screen_gene_length = stable_length + variable_length;
		
		var baseLen = (200 / (final_screen_gene_length/gene_length))/1000;
//		var totalBaseLen = (final_screen_gene_length / (final_screen_gene_length/gene_length))/1000;

		var startX = LEFT_MARGIN - (5*config.sideMargin);

		if( genePanelJson[i].name.endsWith("3p") ) {
			// 3p area
			startX += drawCanvas.node().getBoundingClientRect().width;
			
			var rect = d3.select("#fusion-gene-label-group-3p").selectAll(".fusion-gene-label").node().getBoundingClientRect();
			var base = canvas.node().getBoundingClientRect();

			canvas.append("line")
				.attr('class', 'gene-unit-length')
				.attr('x1', rect.left - base.left - 50 - 200)
				.attr('y1', rect.top - base.top + (rect.height/2))
				.attr('x2', rect.left - base.left - 50)
				.attr("y2", rect.top - base.top + (rect.height/2))
				.attr("style", "stroke:#555;stroke-width:1;")
				.attr("marker-start", "url(#diamond)")
				.attr("marker-end", "url(#diamond)");
		
			canvas.append("text")
				.attr("text-anchor", "middle")
				.attr("dominant-baseline", "bottom")
				.attr("x", rect.left - base.left - 50 - 100)
				.attr("y", rect.top - base.top + (rect.height/2) - 5)
				.text(baseLen.toFixed(2) +"KB");
		}else {
			// 5p area
			var rect = d3.select("#fusion-gene-label-group-5p").selectAll(".fusion-gene-label").node().getBoundingClientRect();
			var base = canvas.node().getBoundingClientRect();

			canvas.append("line")
				.attr('class', 'gene-unit-length')
				.attr('x1', rect.right - base.left + 50)
				.attr('y1', rect.top - base.top + (rect.height/2))
				.attr('x2', rect.right - base.left + 50 + 200)
				.attr("y2", rect.top - base.top + (rect.height/2))
				.attr("style", "stroke:#555;stroke-width:1;")
				.attr("marker-start", "url(#diamond)")
				.attr("marker-end", "url(#diamond)");
		
			canvas.append("text")
				.attr("text-anchor", "middle")
				.attr("dominant-baseline", "bottom")
				.attr("x", rect.right - base.left + 50 + 100)
				.attr("y", rect.top - base.top + (rect.height/2) - 5)
				.text(baseLen.toFixed(2) +"KB");
		}

		canvas.append('line')
			.attr("class", "gene-backbone")
			.attr('x1', startX)
			.attr('y1', 200)
			.attr('x2', startX + final_screen_gene_length)
			.attr("y2", 200)
			.attr("style", "stroke:#555;stroke-width:5;");
	
	
		var rot = 0;
		var margin = 0;
		if( genePanelJson[i].gene.geneFeature.strand === '-' ) {
			rot = 180;
			margin = 8;
		}
		
		canvas.append("path")
		.attr("d", "M0,0 L0,8 L8,0 L0,-8 L0,0")
		.attr("transform", function(){
			return "translate("+(startX + final_screen_gene_length+margin)+","+200+") rotate("+rot+")";
		})
		.attr("x", (startX + final_screen_gene_length))
		.attr("y", 200)
		.attr("fill", "white")
		.attr("style", "stroke:#555;stroke-width:2;");

		canvas.append("path")
		.attr("d", "M0,0 L0,8 L8,0 L0,-8 L0,0")
		.attr("transform", function(d){
			return "translate("+(startX + final_screen_gene_length+7+margin)+","+200+") rotate("+rot+")";
		})
		.attr("fill", "white")
		.attr("style", "stroke:#555;stroke-width:2;");;
	
	
		var breakJunction = config.fusionInfo.gene3Junc.split(":")[1];
		if( config.fusionInfo.fusion_pair.startsWith(genePanelJson[i].gene.symbol) )
			breakJunction = config.fusionInfo.gene5Junc.split(":")[1];
			
	
		var wholeExonLength = 0;
		var transcriptExons = genePanelJson[i].gene.transcripts[0].exons;
		
		// If gene strand is '-' then exon list convert to reverse
		if( genePanelJson[i].gene.geneFeature.strand === '-' )
			transcriptExons = transcriptExons.reverse();

		for(var j=0; j<transcriptExons.length; j++){
			wholeExonLength += transcriptExons[j].end - transcriptExons[j].start + 1;
		}

		var wholeIntronLength = (wholeExonLength * 0.2) / 0.8;		// Fixed each intron size

		var final_gene_length = wholeExonLength + wholeIntronLength;			// modified gene length with shorten intron size
		var final_unit_nt_size = final_screen_gene_length / final_gene_length;	// calculate each nucleotide uni length

		var no_of_intron_size = wholeIntronLength / (transcriptExons.length+1);
		
		var x1 = startX;
		var relative_start = x1;
		
		fusionData[genePanelJson[i].gene.fusionLocation] = {gene:genePanelJson[i].gene, backboneSize:final_screen_gene_length, fusionLocation:fusionFlag};

		var fusionStructure = [];

		var labelStart = 1;
		for(var j=0; j<transcriptExons.length; j++){
			var realExonLength = transcriptExons[j].end - transcriptExons[j].start + 1;
			var onlyLength = 0;
			
			if( drawingType === 1 )
				onlyLength = realExonLength;
			else if( drawingType === 2 )
				onlyLength = wholeExonLength / transcriptExons.length;
			else if( drawingType === 3 ) {
				var ratio = realExonLength/(wholeExonLength/transcriptExons.length);
				var stable_length = (wholeExonLength / transcriptExons.length) * 0.7;
				var variable_length = ((wholeExonLength / transcriptExons.length) * 0.3) * ratio;
				
				onlyLength = stable_length + variable_length;
			}

			x1 += (1 * no_of_intron_size) * final_unit_nt_size;

			var exonColor = "orange";
			if( i === 0)	exonColor = "#33ff99";

			var width = onlyLength * final_unit_nt_size;
			var exon = canvas.append("rect")
				.attr("id", "exon-" + j)
				.attr("class", "exon-feature-label")
				.style("fill", exonColor)
				.style("stroke-width", 1)
				.style("stroke", "#bbb")
				.attr("rx", 2)
				.attr("ry", 2)
				.attr("x", x1)
				.attr("y", 190)
				.attr("width", width)
				.attr("height", 20);

			if( genePanelJson[i].name.endsWith("3p") ){
				if( breakJunction <= transcriptExons[j].end || (breakJunction >= transcriptExons[j].start && breakJunction <= transcriptExons[j].end) )
					fusionStructure.push(transcriptExons[j]);
			}else {
				if( breakJunction >= transcriptExons[j].end || (breakJunction >= transcriptExons[j].start && breakJunction <= transcriptExons[j].end) )
					fusionStructure.push(transcriptExons[j]);
			}

			// Drawing Break point line
			if( breakJunction >= transcriptExons[j].start && breakJunction <= transcriptExons[j].end ) {
				var leftRatio = (breakJunction - transcriptExons[j].start)/realExonLength;
 
				var startX = x1 + (width * leftRatio);
			
				canvas.append('line')
					.attr("class", "break-point")
					.attr("class", "break-point-"+fusionFlag)
					.attr('x1', startX)
					.attr('y1', 150)
					.attr('x2', startX)
					.attr("y2", 180)
					.attr("style", "stroke:#555;stroke-width:1;")
					.attr("marker-end", "url(#arrow)");

				var txtPosX = startX;
				canvas.append("text")
				.attr("class", "break-point-label")
				.attr("text-anchor", "middle")
				.attr("dominant-baseline", "bottom")
				.attr('x', txtPosX)
				.attr('y', 150)
				.text( breakJunction );
		
				fusionData[genePanelJson[i].gene.fusionLocation].breakPos = startX - relative_start;
				labelStart = j+1;
			}
		
			var exonRect = exon.node().getBoundingClientRect();

			canvas.append("text")
					.attr("text-anchor", "middle")
					.attr("dominant-baseline", "central")
					.attr("x", exonRect.left - canvas.node().getBoundingClientRect().left + exonRect.width/2)
					.attr("y", exonRect.top - canvas.node().getBoundingClientRect().top + exonRect.height/2)
					.text((j+1));

			x1 += width;
		}
		
		if( genePanelJson[i].name.endsWith("3p") ) {
			fusionData[genePanelJson[i].gene.fusionLocation].startPos = parseInt(breakJunction);
			fusionData[genePanelJson[i].gene.fusionLocation].endPos = genePanelJson[i].gene.geneFeature.end;
			fusionData[genePanelJson[i].gene.fusionLocation].exonLabelStartIdx = labelStart;
		}else {
			fusionData[genePanelJson[i].gene.fusionLocation].startPos = genePanelJson[i].gene.geneFeature.start;
			fusionData[genePanelJson[i].gene.fusionLocation].endPos = parseInt(breakJunction);
			fusionData[genePanelJson[i].gene.fusionLocation].exonLabelStartIdx = 1;
		}
		fusionData[genePanelJson[i].gene.fusionLocation].fusionStructure = fusionStructure;
	}
	
	return fusionData;
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
		.text("Chromosome " + gene.chromosome + "  ("+ gene.map_location +")");
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
	
	var data = [{width:100,height:50,id:'5pGene',label:"5' Gene"}, {width:100,height:50,id:'3pGene',label:"3' Gene"}];

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
			.attr("fill", "none")
			.attr("x", 0)
			.attr("y", config.explainTopPanelHeight);

	var panel3p = canvas.append("rect")
			.attr("id", "fusion-gene-3p-area")
			.attr("class", "fusion-gene-panel")
			.attr("width", base.width/2)
			.attr("height", base.height - config.explainTopPanelHeight)
			.attr("fill", "none")
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

	canvas.append("svg:defs").append("svg:marker")
	.attr("id", "arrow")
	.attr("refX", 2)
	.attr("refY", 6)
	.attr("markerWidth", 13)
	.attr("markerHeight", 13)
	.attr("orient", "auto")
	.append("svg:path")
	.attr("d", "M2,2 L2,11 L10,6 L2,2")
	.attr("fill", "#555");

	canvas.append("svg:defs").append("svg:marker")
	.attr("id", "diamond")
	.attr("refX", 0)
	.attr("refY", 6)
	.attr("markerWidth", 13)
	.attr("markerHeight", 13)
	.attr("orient", "auto")
	.append("svg:path")
	.attr("d", "M0,6 L6,0 L12,6 L6,12 L0,6 Z")
    .style("fill", "#555");

	return canvas;
};
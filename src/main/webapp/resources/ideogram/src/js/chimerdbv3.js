/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global d3 */
var chromosomeTip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-10, 0])
	.html(function(d) {
		var format = d3.format(',');
		var formattedX = format( (d.gene.end - d.gene.start + 1) );
		var html = "<div><strong>Chromosome :</strong> <span style='color:red'>"+d.gene.chromosome+"</span></div>";
		html += "<div><strong>Length :</strong> <span style='color:red'>"+formattedX+"</span></div>";
		html += "<div><string>Strand :</strong> <span style='color:red'>" + d.gene.strand +"</span></div>"
		
		return html;
	});
	
var exonTip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-10, 0])
	.html(function(d) {
		var html = "<div><strong>Chromosome :</strong> <span style='color:red'>"+d.type+"</span></div>";

		return html;
	});
	
var lineFunction = d3.svg.line()
	.x(function(d) { return d.x; })
	.y(function(d) { return d.y; })
	.interpolate("linear");
					
					
var ChimeraDbV3ViewerWithOutChromosome = function( config ) {
    this.config = JSON.parse( JSON.stringify(config) );

	if( !this.config.canvas ) {
		var canvasRect = d3.select(this.config.container).node().getBoundingClientRect();

		this.config.canvas = d3.select(this.config.container)
			.append("svg")
			.attr("id", "canvas")
			.attr("width", canvasRect.width)
			.attr("height", this.config.canvasHeight);
	
		this.config.canvas.call( chromosomeTip );
		this.config.canvas.call( exonTip );
	}

	if( !this.config.GENE_LABEL_3P_MARGIN ) {
		this.config.GENE_LABEL_3P_MARGIN = 100;
	}
	
	if( !this.config.FUSION_GENE_TYPE_LABEL_HEIGHT ) {
		this.config.FUSION_GENE_TYPE_LABEL_HEIGHT = 40;
	}
	
	if( !this.config.MARGIN_BETWEEN_LABLES ) {
		this.config.MARGIN_BETWEEN_LABLES = 3 * this.config.sideMargin;
	}

	if( !this.config.FUSION_GENE_TYPE_LABEL_WIDTH ) {
		this.config.FUSION_GENE_TYPE_LABEL_WIDTH = this.config.canvas.node().getBoundingClientRect().width / 10;
	}
	
	if( !this.config.FUSION_GENE_TYPE_LABEL_SIDE_MARGIN ) {
		this.config.FUSION_GENE_TYPE_LABEL_SIDE_MARGIN = this.config.sideMargin * 5;
	}

	if( !this.config.fusion_genes ) {
		this.config.fusion_genes = [{type:"5pGene", gene:config.fusionInfo.fusionGene5p}, {type:"3pGene", gene:config.fusionInfo.fusionGene3p}];
	}
	
	if( !this.config.LEFT_MARGIN ) {
		this.config.LEFT_MARGIN = 120;
	}
	
	if( !this.config.BASE_UNIT_LENGTH ) {
		this.config.BASE_UNIT_LENGTH = 200;
	}
	
	if( !this.config.MARGIN_BETWEEN_BACKBONES ) {
		this.config.MARGIN_BETWEEN_BACKBONES = 10 * this.config.sideMargin;
	}
	
	if( !this.config.DOMAIN_COLOURS ) {
		this.config.DOMAIN_COLOURS = ["#F7819F", "#D0F5A9", "#A9D0F5", "#AC58FA", "#F7FE2E", "#DF0101"];
	}
	
	this.init( this.config );

	this.initDefs();

	this.drawEachGeneAreaLabel( this.config );
	this.drawGeneLabel( this.config );
	this.drawMessagerRnaIdLabel( this.config );
	this.drawChromosomeLabel( this.config );

	this.drawGeneStructure( this.config, 1, false );

	this.drawFusionGeneStructure( this.config, 1 );
};


ChimeraDbV3ViewerWithOutChromosome.prototype.init = function( config ) {
	this.config.GENE_TOTAL_LENGTH = getTotalLengthIn( config.fusion_genes );
	this.config.BACKBONE_LENGTH = config.canvas.node().getBoundingClientRect().width - config.LEFT_MARGIN - config.MARGIN_BETWEEN_BACKBONES;
	
	var drawingObj = {};
	for(var i=0; i<config.fusion_genes.length; i++) {
		var obj = config.fusion_genes[i];
		
		var transcriptExons = obj.gene.canonicalTranscript.exons;
		
		var wholeExonLength = 0;
		for(var j=0; j<transcriptExons.length; j++){
			wholeExonLength += getLength(transcriptExons[j]);
		}

		var len = getLength( obj.gene );
		var screenObj = getWithOfScreenForGene(len, this.config.GENE_TOTAL_LENGTH, this.config.BACKBONE_LENGTH);
		var wholeIntronLength = (wholeExonLength * 0.2) / 0.8;
		var final_gene_length = wholeExonLength + wholeIntronLength;			// modified gene length with shorten intron size
		var final_unit_nt_size = screenObj.final_screen_gene_length / final_gene_length;	// calculate each nucleotide uni length
		var no_of_intron_size = wholeIntronLength / (transcriptExons.length+1);

		drawingObj[obj.type] = { gene_length:len, screenObj:screenObj, exon_length:wholeExonLength, whole_intron_length:wholeIntronLength, final_unit_nt_size:final_unit_nt_size, no_of_intron_size:no_of_intron_size };
	}
	this.config.drawingObj = drawingObj;
};


ChimeraDbV3ViewerWithOutChromosome.prototype.drawFusionGeneStructure = function( config, drawingType ) {
	var canvas = config.canvas;
	var canvasRect = config.canvas.node().getBoundingClientRect();
	var fusedExons = config.fusionInfo.fusedExons;

	var fused = [{type:'5pGene', exons:fusedExons["5'"]}, {type:'3pGene', exons:fusedExons["3'"]}];

	var gene5p = config.fusionInfo.fusionGene5p;
	var gene3p = config.fusionInfo.fusionGene3p;
	
	var gene5Junc = config.fusionInfo.gene5Junc.split(":")[1];
	var gene3Junc = config.fusionInfo.gene3Junc.split(":")[1];
	
	var lenJunction5p = gene5Junc - gene5p.start + 1;
	var lenJunction3p = gene3p.end - gene3Junc + 1;
	
	var gene_total_length = lenJunction5p + lenJunction3p;
	var geneBackbonLength = config.BACKBONE_LENGTH;
	var startX = (canvasRect.width/2) - (geneBackbonLength/2) + config.LEFT_MARGIN - (4*config.sideMargin);
		
	var backbone = canvas.append("g").attr("id", "fused-gene-backbone-group");

	var orginalGeneStructureRect = d3.select("#fusion-gene-backbone-group").node().getBoundingClientRect();
	
	var y = relativeOffsetY(orginalGeneStructureRect, canvasRect) + orginalGeneStructureRect.height + config.MARGIN_BETWEEN_BACKBONES;

	var backbone_color = ["#555", "#f7e"];
	for(var i=0; i<fused.length; i++) {
		var type = fused[i].type;
		var exons = fused[i].exons;

		var gene_length = (type==='5pGene')?lenJunction5p:lenJunction3p;
		var gene_length_ratio = gene_length / gene_total_length;

		var stable_length = ((geneBackbonLength/2) * 0.7);
		var variable_length = (((geneBackbonLength/2) * 0.3) * 2) * gene_length_ratio;

		var final_screen_gene_length = stable_length + variable_length;

		var backboneLine = backbone.append('line')
		.attr("id", "fused-gene-backbone-" + type)
		.attr('x1', startX)
		.attr('y1', y)
		.attr('x2', startX + final_screen_gene_length )
		.attr("y2", y)
		.attr("style", "stroke:"+backbone_color[i]+";stroke-width:5;");

		startX += final_screen_gene_length;

		try {
			var breakPointRect = d3.select("#breakpoint-line-"+type).node().getBoundingClientRect();
			var backboneRect = backboneLine.node().getBoundingClientRect();

			backbone.append("line")
				.attr("x1", breakPointRect.left - canvasRect.left)
				.attr("y1", breakPointRect.bottom - canvasRect.top + 30)
				.attr("x2", type === '5pGene'?backboneRect.right - canvasRect.left:backboneRect.left - canvasRect.left)
				.attr("y2", relativeOffsetY(backboneRect, canvasRect ))
				.attr("style", "stroke:#00f;stroke-width:1;")
				.style("stroke-dasharray", ("2,3"));
		}catch(e) {
			console.log(e);
		}
	}

	d3.select("svg").attr("height", y + 50);
//
//	var backbone_color = ["#555", "#f7e"];
//	for(var i=0; i<fusion.length; i++) {
//		var gene_length = fusion[i].endPos - fusion[i].startPos + 1;
//		var gene_length_ratio = gene_length / gene_total_length;
//
//		var stable_length = ((geneBackbonLength/2) * 0.7);
//		var variable_length = (((geneBackbonLength/2) * 0.3) * 2) * gene_length_ratio;
//
//		var final_screen_gene_length = stable_length + variable_length;
//
//		var backbone = canvas.append('line')
//		.attr("class", "fusion-gene-backbone-5p")
//		.attr('x1', startX)
//		.attr('y1', 400)
//		.attr('x2', startX + final_screen_gene_length )
//		.attr("y2", 400)
//		.attr("style", "stroke:"+backbone_color[i]+";stroke-width:5;");
//
//		var wholeExonLength = 0;
//		var transcriptExons = fusion[i].fusionStructure;
//		for(var j=0; j<transcriptExons.length; j++){
//			wholeExonLength += transcriptExons[j].end - transcriptExons[j].start + 1;
//		}
//
//		var wholeIntronLength = (wholeExonLength * 0.2) / 0.8;		// Fixed each intron size
//
//		var final_gene_length = wholeExonLength + wholeIntronLength;			// modified gene length with shorten intron size
//		var final_unit_nt_size = final_screen_gene_length / final_gene_length;	// calculate each nucleotide uni length
//
//		var no_of_intron_size = wholeIntronLength / (transcriptExons.length+1);
//		
//		var x1 = startX;
//		
//		var exonLabelStartIdx = fusion[i].exonLabelStartIdx;
//		for(var j=0; j<transcriptExons.length; j++){
//			var realExonLength = transcriptExons[j].end - transcriptExons[j].start + 1;
//			var onlyLength = 0;
//			
//			if( drawingType === 1 )
//				onlyLength = realExonLength;
//			else if( drawingType === 2 )
//				onlyLength = wholeExonLength / transcriptExons.length;
//			else if( drawingType === 3 ) {
//				var ratio = realExonLength/(wholeExonLength/transcriptExons.length);
//				var stable_length = (wholeExonLength / transcriptExons.length) * 0.7;
//				var variable_length = ((wholeExonLength / transcriptExons.length) * 0.3) * ratio;
//				
//				onlyLength = stable_length + variable_length;
//			}
//
//			x1 += (1 * no_of_intron_size) * final_unit_nt_size;
//
//			var exonColor = "orange";
//			if( i === 0)	exonColor = "#33ff99";
//
//			var width = onlyLength * final_unit_nt_size;
//			var exon = canvas.append("rect")
//				.attr("id", "exon-" + j)
//				.attr("class", "exon-feature-label")
//				.style("fill", exonColor)
//				.style("stroke-width", 1)
//				.style("stroke", "#bbb")
//				.attr("rx", 2)
//				.attr("ry", 2)
//				.attr("x", x1)
//				.attr("y", 390)
//				.attr("width", width)
//				.attr("height", 20);
//		
//			var exonRect = exon.node().getBoundingClientRect();
//
//			canvas.append("text")
//					.attr("text-anchor", "middle")
//					.attr("dominant-baseline", "central")
//					.attr("x", exonRect.left - canvas.node().getBoundingClientRect().left + exonRect.width/2)
//					.attr("y", exonRect.top - canvas.node().getBoundingClientRect().top + exonRect.height/2)
//					.text(exonLabelStartIdx+j);
//
//			x1 += width;
//		}
//
//		try {
//			var breakPointRect = d3.select(".break-point-"+fusion[i].fusionLocation).node().getBoundingClientRect();
//			var baseRect = canvas.node().getBoundingClientRect();
//			var backboneRect = backbone.node().getBoundingClientRect();
//
//			canvas.append("line")
//				.attr("x1", breakPointRect.left - baseRect.left)
//				.attr("y1", breakPointRect.bottom - baseRect.top + 30)
//				.attr("x2", fusion[i].fusionLocation === '5p'?backboneRect.right - baseRect.left:backboneRect.left - baseRect.left)
//				.attr("y2", backboneRect.top - baseRect.top)
//				.attr("style", "stroke:#00f;stroke-width:1;")
//				.style("stroke-dasharray", ("2,3"));
//		}catch(e) {
//			console.log(e);
//		}
//		
//		startX += final_screen_gene_length;
//	}
};

//ChimeraDbV3ViewerWithOutChromosome.prototype.drawFusionGeneStructure = function( config, canvas, fusionData, drawingType ) {
//	var fusion5p = fusionData["5'"];
//	var fusion3p = fusionData["3'"];
//
//	var fusion = [fusion5p, fusion3p];
//
//	var gene_total_length = (fusion5p.endPos - fusion5p.startPos + 1) + (fusion3p.endPos - fusion3p.startPos + 1);
//	var geneBackbonLength = 700;
//	var startX = (canvas.node().getBoundingClientRect().width/2) - (geneBackbonLength/2);
//
//	var backbone_color = ["#555", "#f7e"];
//	for(var i=0; i<fusion.length; i++) {
//		var gene_length = fusion[i].endPos - fusion[i].startPos + 1;
//		var gene_length_ratio = gene_length / gene_total_length;
//
//		var stable_length = ((geneBackbonLength/2) * 0.7);
//		var variable_length = (((geneBackbonLength/2) * 0.3) * 2) * gene_length_ratio;
//
//		var final_screen_gene_length = stable_length + variable_length;
//
//		var backbone = canvas.append('line')
//		.attr("class", "fusion-gene-backbone-5p")
//		.attr('x1', startX)
//		.attr('y1', 400)
//		.attr('x2', startX + final_screen_gene_length )
//		.attr("y2", 400)
//		.attr("style", "stroke:"+backbone_color[i]+";stroke-width:5;");
//
//		var wholeExonLength = 0;
//		var transcriptExons = fusion[i].fusionStructure;
//		for(var j=0; j<transcriptExons.length; j++){
//			wholeExonLength += transcriptExons[j].end - transcriptExons[j].start + 1;
//		}
//
//		var wholeIntronLength = (wholeExonLength * 0.2) / 0.8;		// Fixed each intron size
//
//		var final_gene_length = wholeExonLength + wholeIntronLength;			// modified gene length with shorten intron size
//		var final_unit_nt_size = final_screen_gene_length / final_gene_length;	// calculate each nucleotide uni length
//
//		var no_of_intron_size = wholeIntronLength / (transcriptExons.length+1);
//		
//		var x1 = startX;
//		
//		var exonLabelStartIdx = fusion[i].exonLabelStartIdx;
//		for(var j=0; j<transcriptExons.length; j++){
//			var realExonLength = transcriptExons[j].end - transcriptExons[j].start + 1;
//			var onlyLength = 0;
//			
//			if( drawingType === 1 )
//				onlyLength = realExonLength;
//			else if( drawingType === 2 )
//				onlyLength = wholeExonLength / transcriptExons.length;
//			else if( drawingType === 3 ) {
//				var ratio = realExonLength/(wholeExonLength/transcriptExons.length);
//				var stable_length = (wholeExonLength / transcriptExons.length) * 0.7;
//				var variable_length = ((wholeExonLength / transcriptExons.length) * 0.3) * ratio;
//				
//				onlyLength = stable_length + variable_length;
//			}
//
//			x1 += (1 * no_of_intron_size) * final_unit_nt_size;
//
//			var exonColor = "orange";
//			if( i === 0)	exonColor = "#33ff99";
//
//			var width = onlyLength * final_unit_nt_size;
//			var exon = canvas.append("rect")
//				.attr("id", "exon-" + j)
//				.attr("class", "exon-feature-label")
//				.style("fill", exonColor)
//				.style("stroke-width", 1)
//				.style("stroke", "#bbb")
//				.attr("rx", 2)
//				.attr("ry", 2)
//				.attr("x", x1)
//				.attr("y", 390)
//				.attr("width", width)
//				.attr("height", 20);
//		
//			var exonRect = exon.node().getBoundingClientRect();
//
//			canvas.append("text")
//					.attr("text-anchor", "middle")
//					.attr("dominant-baseline", "central")
//					.attr("x", exonRect.left - canvas.node().getBoundingClientRect().left + exonRect.width/2)
//					.attr("y", exonRect.top - canvas.node().getBoundingClientRect().top + exonRect.height/2)
//					.text(exonLabelStartIdx+j);
//
//			x1 += width;
//		}
//
//		try {
//			var breakPointRect = d3.select(".break-point-"+fusion[i].fusionLocation).node().getBoundingClientRect();
//			var baseRect = canvas.node().getBoundingClientRect();
//			var backboneRect = backbone.node().getBoundingClientRect();
//
//			canvas.append("line")
//				.attr("x1", breakPointRect.left - baseRect.left)
//				.attr("y1", breakPointRect.bottom - baseRect.top + 30)
//				.attr("x2", fusion[i].fusionLocation === '5p'?backboneRect.right - baseRect.left:backboneRect.left - baseRect.left)
//				.attr("y2", backboneRect.top - baseRect.top)
//				.attr("style", "stroke:#00f;stroke-width:1;")
//				.style("stroke-dasharray", ("2,3"));
//		}catch(e) {
//			console.log(e);
//		}
//		
//		startX += final_screen_gene_length;
//	}
//};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawUnitLengthOfEachGene = function( config ) {
	var canvasRect = this.config.canvas.node().getBoundingClientRect();
	var canvas = this.config.canvas;

	var UNIT_LENGTH_LABEL_MARGIN = 50;

	var lblGroup = canvas.select("#fusion-gene-label-group")
		.append("g")
		.attr("id", "fusion-gene-unit-length-group");

	var aa = this.config;

	lblGroup.selectAll("path")
			.data( config.fusion_genes )
			.enter()
			.append("path")
			.attr("id", function(d, i) {
				return (i===0)?"gene-unit-length-"+d.type:"gene-unit-length-"+d.type;
			})
			.attr('class', 'gene-unit-length')
			.attr('d', function(d, i) {
				var selector = d.type + "_label_rect";

				var offsetX1 = -1 * UNIT_LENGTH_LABEL_MARGIN;
				var offsetX2 = -1 * (UNIT_LENGTH_LABEL_MARGIN + config.BASE_UNIT_LENGTH);

				var rect = d3.select("rect[id='"+selector+"']").node().getBoundingClientRect();

				if( i===0 ) {
					offsetX1 = rect.width + UNIT_LENGTH_LABEL_MARGIN;
					offsetX2 = rect.width + UNIT_LENGTH_LABEL_MARGIN + (config.BASE_UNIT_LENGTH/2);
				}

				var x1 = relativeOffsetX(rect, canvasRect) + (offsetX1 + offsetX2);
				var y1 = relativeOffsetY(rect, canvasRect) + (rect.height/2);
				var x2 = relativeOffsetX(rect, canvasRect) + (offsetX1);
				var y2 = relativeOffsetY(rect, canvasRect) + (rect.height/2);

				return "M"+x1+","+y1+" L"+x2+","+y2;
			})
			.attr("style", "stroke:#555;stroke-width:1;")
			.attr("marker-start", "url(#diamond)")
			.attr("marker-end", "url(#diamond)");
	
	var lblGroup = canvas.select("#fusion-gene-label-group").select("#fusion-gene-unit-length-group");
	lblGroup.selectAll("text")
			.data( config.fusion_genes )
			.enter()
			.append("text")
				.attr("text-anchor", "middle")
				.attr("dominant-baseline", "ideographic")
				.attr("transform", function(d, i){
					var selector = "gene-unit-length-" + d.type;

					var rect = d3.select("path[id='"+selector+"']").node().getBoundingClientRect();

					var x = relativeOffsetX(rect, canvasRect) + rect.width/2;
					var y = relativeOffsetY(rect, canvasRect) - config.sideMargin;
					return "translate("+(x)+","+y+") rotate("+0+")";
				})
			.style("font-size", "14px")
			.text(function(d, i){
				var current_gene_length = config.drawingObj[d.type].gene_length;
				var screenObj = config.drawingObj[d.type].screenObj;

				var baseLen = (config.BASE_UNIT_LENGTH / (screenObj.final_screen_gene_length/current_gene_length))/1000;

				return baseLen.toFixed(2) +"KB";
			});
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawDonorGeneBackbone = function( config, isAllowedReverse ) {
	var canvas = this.config.canvas;

	var backbone = canvas.append("g")
		.attr("id", "fusion-gene-backbone-group");
	
	backbone.selectAll("path")
			.data( config.fusion_genes )
			.enter()
			.append("g")
			.attr("id", function(d, i){
				return (i===0)?"fusion-gene-backbone-" + d.type:"fusion-gene-backbone-"+d.type;
			})
			.append("path")
			.attr("id", function(d, i){
				return "gene-backbone-line-" + d.type;
			})
			.classed("gene-backbone", true)
			.attr("d", function(d, i){
				var screenObj = config.drawingObj[d.type].screenObj;

				var x1 = config.LEFT_MARGIN;
				var y1 = 250;
				var x2 = screenObj.final_screen_gene_length;
				var y2 = 250;

				if( i !== 0 ) {
					var offset = (config.BACKBONE_LENGTH - screenObj.final_screen_gene_length);
					x1 += offset + (config.MARGIN_BETWEEN_BACKBONES/2);
				}

				x2 += x1;
				
				// backbone의 시작위치를 지정함
				config.drawingObj[d.type].startX = x1;

				return "M"+x1+","+y1+" L"+x2+","+y2;
			})
			.attr("marker-end", function(d, i){
				if( isAllowedReverse === true ) {
					if( d.gene.strand === '+' )
						return "url(#double_arrow_right)";
					return "url(#double_arrow_left)";
				}else {
					return "url(#double_arrow_right)";
				}
			});
			
	return backbone;
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawExons = function( config, backbone, drawingType, isAllowedReverse ) {
	config.EXON_Y_POS = 240;
	config.EXON_HEIGHT = 20;
	var onScreen= {};
	for( var j=0; j<config.fusion_genes.length; j++) {
		var obj = config.fusion_genes[j];

		var exonGroup = backbone.select("#fusion-gene-backbone-" + obj.type).append("g").attr("class", "exon-group-" + obj.type);

		var transcriptExons = obj.gene.canonicalTranscript.exons;

		if( isAllowedReverse === true ) {
			if( obj.gene.strand === "-" )	{
				transcriptExons = transcriptExons.reverse();
			}
		}

		var exonPos = {};

		var x1 = config.drawingObj[obj.type].startX;
		exonGroup.selectAll("path")
				.data(transcriptExons)
				.enter()
				.append("path")
				.classed("exon-feature-rect", true)
				.classed("exon-feature-3p", obj.type==="3pGene"?true:false)
				.classed("exon-feature-5p", obj.type==="5pGene"?true:false)
				.attr("d", function(d, i) {
					var realExonLength = getLength(d);
					var onlyLength = 0;

					if( drawingType === 1 )
						onlyLength = realExonLength;
					else if( drawingType === 2 )
						onlyLength = config.drawingObj[obj.type].whole_exon_length / transcriptExons.length;
					else if( drawingType === 3 ) {
						var ratio = realExonLength/(config.drawingObj[obj.type].whole_exon_length/transcriptExons.length);
						var stable_length = (config.drawingObj[obj.type].whole_exon_length / transcriptExons.length) * 0.6;
						var variable_length = ((config.drawingObj[obj.type].whole_exon_length / transcriptExons.length) * 0.4) * ratio;

						onlyLength = stable_length + variable_length;
					}
					
					x1 += (1 * config.drawingObj[obj.type].no_of_intron_size) * config.drawingObj[obj.type].final_unit_nt_size;
					var width = onlyLength * config.drawingObj[obj.type].final_unit_nt_size;

					exonPos[ d.elementIndex ] = {x1:x1, width:width};

					var points = "M"+x1+","+config.EXON_Y_POS+" L"+(x1+width)+","+config.EXON_Y_POS+" L"+(x1+width)+","+(config.EXON_Y_POS+config.EXON_HEIGHT)+" L"+x1+","+(config.EXON_Y_POS+config.EXON_HEIGHT)+" Z";

					x1 += width;
					
					return points;
				})
				.on("mouseover", exonTip.show)
				.on("mouseout", exonTip.hide);

		onScreen[obj.type] = {exons:exonPos};
		
		exonGroup.selectAll("text")
				.data(transcriptExons)
				.enter()
				.append("text")
				.attr("text-anchor", "middle")
				.attr("dominant-baseline", "central")
				.attr("x", function(d, i){
					var x1 = exonPos[d.elementIndex].x1;
					var width = exonPos[d.elementIndex].width;

					return (x1 + (width/2));
				})
				.attr("y", (config.EXON_Y_POS + (config.EXON_HEIGHT/2)))
				.text( function(d, i){ return d.elementIndex; } )
				.on("mouseover", exonTip.show)
				.on("mouseout", exonTip.hide);
	}
	config.exonsOnScreen = onScreen;
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawPfamdomains= function( config, backbone, isAllowedReverse, isPacked ) {
	var canvasRect = this.config.canvas.node().getBoundingClientRect();

	for( var i=0; i<config.fusion_genes.length; i++) {
		var obj = config.fusion_genes[i];
		var transcriptExons = obj.gene.canonicalTranscript.exons;

		var domainGroup = backbone.select("#fusion-gene-backbone-" + obj.type).append("g").attr("class", "domain-group-" + obj.type);
	
		var exonPos = config.exonsOnScreen[obj.type];

		var layerY = config.EXON_Y_POS + config.EXON_HEIGHT + 5;
		for(var j=0; j<obj.gene.pFamDomainList.length; j++ ) {
			var domainFragments = obj.gene.pFamDomainList[j].fragments;

			var domainLayerGroup = domainGroup.append("g").attr("id", "domain-group-" + obj.type + "-" + j);

			var isFirst = {flag:false, startX:-1};
			for(var k=0; k<domainFragments.length; k++) {
				var fragment = domainFragments[k];
				for(var t=0; t<transcriptExons.length; t++) {
					var exon = transcriptExons[t];

					var isoverlapped = isOverlapped( fragment, exon );
					if( isoverlapped ) {
						var pos = exonPos.exons[ exon.elementIndex ];

						domainLayerGroup.append("rect")
						.classed("domain-feature-rect", true)
						.attr("fill", config.DOMAIN_COLOURS[j])
						.attr("rx", 2)
						.attr("ry", 2)
						.attr("x", pos.x1)
						.attr("y", layerY )
						.attr("width", pos.width)
						.attr("height", config.EXON_HEIGHT);

						if( isFirst.flag === false ) {
							isFirst.startX = pos.x1;
							isFirst.flag = true;
						}
					}
				}
			}

			var domainLayerGroupRect = domainLayerGroup.node().getBoundingClientRect();
			var domainLayerLabelGroup = domainGroup.append("g").attr("id", "domain-label-group-" + obj.type + "-" + j);
			if( domainFragments[j] ) {
				domainLayerLabelGroup.append("text")
						.attr("text-anchor", "end")
						.attr("dominant-baseline", "central")
						.attr("x", isAllowedReverse===true?(isFirst.startX - 5):relativeOffsetX(domainLayerGroupRect, canvasRect) - 10)
						.attr("y", relativeOffsetY(domainLayerGroupRect, canvasRect) + config.EXON_HEIGHT/2 )
						.text( !domainFragments[j] ? "": domainFragments[j].name );
				;
			}
			
			layerY += config.EXON_HEIGHT + 5;
		}
	}
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawLabel= function( config, labelData ){
	var canvasRect = this.config.canvas.node().getBoundingClientRect();
	
	var label = d3.select("#fusion-gene-backbone-group").insert("g", ":first-child").attr("id", "each-gene-structure-label");
	
	label.append("g")
			.selectAll("rect")
			.data( labelData )
			.enter()
			.append("rect")
			.classed("structure-background", true)
			.attr("x", function(d){
				return d.startX + d.width;
			})
			.attr("y", function(d){
				return d.startY;
			})
			.attr("width", function(d){
				return canvasRect.width - (d.startX + d.width) - (2*config.sideMargin);
			})
			.attr("height", function(d){
				return d.height;
			});					

	var lblGene = label.append("g");
			lblGene.selectAll("rect")
			.data( labelData )
			.enter()
			.append("rect")
			.classed("structure-label", true)
			.attr("x", function(d){
				return d.startX;
			})
			.attr("y", function(d){
				return d.startY;
			})
			.attr("width", function(d){
				return d.width;
			})
			.attr("height", function(d){
				return d.height;
			});

	lblGene.selectAll("text")
		.data(labelData)
		.enter()
		.append("text")
		.style("font-size", "14px")
		.attr("text-anchor", "middle")
		.attr("baseline-shift", "-24%")
		.attr("x",function(d){return d.startX + d.width/2;})
		.attr("y", function(d){return d.startY + d.height/2;} )
		.text( function(d){return d.name;} );
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawBreakPointInGeneStructure = function( config, backbone ) {
	for( var i=0; i<config.fusion_genes.length; i++) {
		var obj = config.fusion_genes[i];
		var transcriptExons = obj.gene.canonicalTranscript.exons;
		
		var divs = config.fusionInfo.gene5Junc.split(":");
		if( obj.type === "3pGene")	divs = config.fusionInfo.gene3Junc.split(":");
		var point = divs[1];
		
		var exonPos = config.exonsOnScreen[obj.type];
		var screenUnit = config.drawingObj[obj.type];

		var breakPointX = -1;
		var previous = null;
		for(var j=0; j<transcriptExons.length; j++) {
			var exon = transcriptExons[j];
			var isoverlapped = isOverlappedPoint( exon, point );
			if( isoverlapped ) {
				var pos = exonPos.exons[ exon.elementIndex ];
				breakPointX = pos.x1 + screenUnit.final_unit_nt_size * (point - exon.start);
				break;
			}else if( previous !== null && exon.start > point && previous.end < point ){
				var pos = exonPos.exons[ exon.elementIndex ];
				var posPrev = exonPos.exons[previous.elementIndex];
				breakPointX = pos.x1 - (pos.x1 - posPrev.x1)/2;

				break;
			}
			previous = exon;
		}
		
		var breakPoint = backbone.select("#fusion-gene-backbone-" + obj.type).append("g");
		breakPoint.append("line")
				.attr("id", "breakpoint-line-" + obj.type)
				.attr("x1", breakPointX)
				.attr("y1", 200)
				.attr("x2", breakPointX)
				.attr("y2", 230)
				.attr("style", "stroke:#555;stroke-width:1;")
				.attr("marker-end", "url(#arrow)");
		;

		breakPoint.append("text")
		.attr("class", "break-point-label")
		.style("font-size", "14px")
		.attr("text-anchor", "middle")
		.attr("dominant-baseline", "bottom")
		.attr('x', breakPointX)
		.attr('y', 190)
		.text( obj.gene.chromosome + ":" + point );
	}
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawGeneStructure = function( config, drawingType, isAllowedReverse ) {
	this.drawUnitLengthOfEachGene( config );

	var backbone = this.drawDonorGeneBackbone( config, isAllowedReverse );
	this.drawExons( config, backbone, drawingType, isAllowedReverse );
	this.drawPfamdomains( config, backbone, isAllowedReverse );

	var heightVal5p = d3.select(".domain-group-5pGene").node().getBBox().height;
	var heightVal3p = d3.select(".domain-group-3pGene").node().getBBox().height;

	var domainAreaHeight = Math.max(heightVal5p, heightVal3p);
	
	var labelData = [
		{name:"Gene", startX:config.sideMargin, startY:(config.EXON_Y_POS - 7.5), width:(config.LEFT_MARGIN - (5*config.sideMargin)), height:30}
		,{name:"Domain", startX:config.sideMargin, startY:(config.EXON_Y_POS + config.EXON_HEIGHT + 5), width:(config.LEFT_MARGIN - (5*config.sideMargin)), height:domainAreaHeight + 5}
	];

	this.drawLabel( config, labelData );
	this.drawBreakPointInGeneStructure( config, backbone );
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawChromosomeLabel = function(config) {
	var canvasRect = this.config.canvas.node().getBoundingClientRect();
	var canvas = this.config.canvas;
	
	var lblGeneChrGroup = canvas.append("g").attr("id", "fusion-gene-chromosome-label-group");
	
	lblGeneChrGroup.selectAll("text")
			.data( config.fusion_genes )
			.enter()
			.append("text")
			.attr("id",function(d, i){
				return (i===0)?"gene-chromosome-5p":"gene-chromosome-3p";
			})
			.style("font-size", "14px")
			.attr("class", "gene-name-label")
			.attr("text-anchor", "middle")
			.attr("dominant-baseline", "central")
			.attr("transform", function(d, i) {
				var transcriptIdSelector = "transcript-id-3p";
				var geneSymbolSelector = "gene-symbol-3p";
				if( i===0 ) {
					transcriptIdSelector = "transcript-id-5p";
					geneSymbolSelector = "gene-symbol-5p";
				}
				var geneSymbolLabel = d3.select("text[id='"+geneSymbolSelector+"']");
				var transcriptIdLabel = d3.select("text[id='"+transcriptIdSelector+"']");
				
				var rectSymbol		= geneSymbolLabel.node().getBoundingClientRect();
				var rectTranscript	= transcriptIdLabel.node().getBoundingClientRect();

				var y = relativeOffsetY(rectSymbol, canvasRect) + rectSymbol.height + config.MARGIN_BETWEEN_LABLES;
				var x = rectTranscript.right - canvasRect.left;
				x = relativeOffsetX(rectSymbol, canvasRect) + (x - relativeOffsetX(rectSymbol, canvasRect))/2;

				return "translate(" + x + "," + y + ")";
			})
			.text(function(d){ return d.gene.chromosome.replace("chr", "Chromosome ") + ":" + d.gene.start + "-" + d.gene.end + " ( "+d.gene.strand+" )"; })
			.on("mouseover", chromosomeTip.show)
			.on("mouseout", chromosomeTip.hide);
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawGeneLabel = function(config) {
	var canvasRect = this.config.canvas.node().getBoundingClientRect();
	var canvas = this.config.canvas;
	
	var lblGeneSymbolGroup = canvas.append("g").attr("id", "fusion-gene-symbol-label-group");
	
	lblGeneSymbolGroup.selectAll("text")
			.data( config.fusion_genes )
			.enter()
			.append("text")
			.attr("id",function(d, i){
				return (i===0)?"gene-symbol-5p":"gene-symbol-3p";
			})
			.style("font-size", "14px")
			.attr("class", "gene-name-label")
			.attr("text-anchor", "middle")
			.attr("dominant-baseline", "central")
			.attr("transform", function(d, i) {
				var selector = (i===0?"5pGene_label_rect":"3pGene_label_rect");

				var rect = d3.select("rect[id='"+selector+"']").node().getBoundingClientRect();

				var x = relativeOffsetX(rect, canvasRect) + (rect.width/2);
				var y = relativeOffsetY(rect, canvasRect) + rect.height + config.MARGIN_BETWEEN_LABLES;

				return "translate(" + (i===0?x:x-config.GENE_LABEL_3P_MARGIN) + "," + y + ")";
		})
		.text(function(d){ return d.gene.symbol; });
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawMessagerRnaIdLabel = function(config) {
	var canvasRect = this.config.canvas.node().getBoundingClientRect();
	var canvas = this.config.canvas;

	var lblGeneTranscriptIdGroup = canvas.append("g").attr("id", "fusion-gene-transcript-id-label-group");

	lblGeneTranscriptIdGroup.selectAll("text")
			.data(config.fusion_genes)
			.enter()
			.append("text")
			.attr("id",function(d, i){
				return (i===0)?"transcript-id-5p":"transcript-id-3p";
			})
			.style("font-size", "14px")
			.attr("class", "mirna-name-label")
			.attr("text-anchor", "middle")
			.attr("dominant-baseline", "central")
			.attr("transform", function(d, i) {
				var selector = d.type + "_label_rect";
		
				var rect = d3.select("rect[id='"+selector+"']").node().getBoundingClientRect();

				var x = ( relativeOffsetX(rect, canvasRect)+(rect.width/2) + 80);
				var y = relativeOffsetY(rect, canvasRect) + rect.height + config.MARGIN_BETWEEN_LABLES;

				return "translate(" + (i===0?x:x-config.GENE_LABEL_3P_MARGIN) + "," + y + ")";
			})
			.text(function(d){return d.gene.canonicalTranscript.attributesMap.Name;});
	;
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawEachGeneAreaLabel = function(config) {
	var canvasRect = this.config.canvas.node().getBoundingClientRect();
	var canvas = this.config.canvas;

	var lblGroup = canvas.append("g").attr("id", "fusion-gene-label-group").append("g").attr("id", "fusion-gene-unit-length-label-group");
	
	var data = [
			{width:config.FUSION_GENE_TYPE_LABEL_WIDTH,height:config.FUSION_GENE_TYPE_LABEL_HEIGHT,id:'5pGene',label:"5' Gene"}
			, {width:config.FUSION_GENE_TYPE_LABEL_WIDTH,height:config.FUSION_GENE_TYPE_LABEL_HEIGHT,id:'3pGene',label:"3' Gene"}
		];

	var rect = lblGroup.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("id", function(d){return d.id + "_label_rect";})
			.attr("class", "fusion-gene-label")
			.attr("transform", function(d, i){
				var x = 5 * config.sideMargin;
				var y = 3 * config.sideMargin;
				if( i === 1 ) {
					x = (canvasRect.width - (d.width + config.FUSION_GENE_TYPE_LABEL_SIDE_MARGIN));
				}
				return "translate(" + x + "," + y + ")";
			})
			.attr("width", function(d){ return d.width; } )
			.attr("height", function(d){ return d.height; } )
			.attr("fill", "none")
			.attr("border", "1")
			.attr("stroke", "gray")
			.style("stroke-dasharray", ("2,3"));

	lblGroup.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.style("font-size", "14px")
			.attr("text-anchor", "middle")
			.attr("dominant-baseline", "central")
			.attr("transform", function(d, i) {
				var baseRect = d3.select("rect[id='" + d.id + "_label_rect']").node();

				var relativeLabelRectTop = relativeOffsetY( baseRect.getBoundingClientRect(), canvasRect );

				var x = (baseRect.getBoundingClientRect().width/2) + config.FUSION_GENE_TYPE_LABEL_SIDE_MARGIN;
				if( i === 1 ) {
					x = canvasRect.width - (d.width/2) - config.FUSION_GENE_TYPE_LABEL_SIDE_MARGIN;
				}
				var y = relativeLabelRectTop + (d.height/2);

				return "translate(" + x + "," + y + ")";
			})
			.text(function(d){ return d.label;});
};

ChimeraDbV3ViewerWithOutChromosome.prototype.initLayout = function() {
	var canvasRect = this.config.canvas.node().getBoundingClientRect();

	var canvas = this.config.canvas;

	var group = canvas.append("g");
	
	group.append("rect")
	.attr("id", "fusion-gene-top-panel-5p")
	.attr("class", "fusion-gene-top-panel")
	.attr("width", canvasRect.width)
	.attr("height", this.config.topPanelHeightToExplain)
	.attr("fill", "#F1F1F1")
	.style("opacity", "0.5")
	.attr("x", 0)
	.attr("y", 0);

	group.append("rect")
	.attr("id", "fusion-gene-top-panel-3p")
	.attr("class", "fusion-gene-top-panel")
	.attr("width", canvasRect.width/2)
	.attr("height", this.config.topPanelHeightToExplain)
	.attr("fill", "none")
	.attr("x", canvasRect.width/2)
	.attr("y", 0);

	group.append("rect")
	.attr("id", "fusion-gene-5p-area")
	.attr("class", "fusion-gene-panel")
	.attr("width", canvasRect.width/2)
	.attr("height", canvasRect.height - this.config.topPanelHeightToExplain)
	.attr("fill", "none")
	.attr("x", 0)
	.attr("y", this.config.topPanelHeightToExplain);

	group.append("rect")
	.attr("id", "fusion-gene-3p-area")
	.attr("class", "fusion-gene-panel")
	.attr("width", canvasRect.width/2)
	.attr("height", canvasRect.height - this.config.topPanelHeightToExplain)
	.attr("fill", "none")
	.attr("x", canvasRect.width/2)
	.attr("y", this.config.topPanelHeightToExplain);
};

ChimeraDbV3ViewerWithOutChromosome.prototype.initDefs = function() {
	var canvas = this.config.canvas;

	var defs = canvas.append("svg:defs");
			
	defs.append("svg:marker")
		.attr("id", "arrow")
		.attr("refX", 10)
		.attr("refY", 6)
		.attr("markerWidth", 13)
		.attr("markerHeight", 13)
		.attr("orient", "auto")
		.append("svg:path")
		.attr("d", "M2,2 L2,11 L10,6 L2,2")
		.attr("fill", "#555");

	defs.append("svg:marker")
		.attr("id", "diamond")
		.attr("refX", 0)
		.attr("refY", 6)
		.attr("markerWidth", 13)
		.attr("markerHeight", 13)
		.attr("orient", "auto")
		.append("svg:path")
		.attr("d", "M0,6 L6,0 L12,6 L6,12 L0,6 Z")
		.style("fill", "#555");
	
	
	var mk = defs.append("svg:marker")
		.attr("id", "double_arrow_left")
		.attr("refX", 0)
		.attr("refY", 8)
		.attr("markerWidth", 16)
		.attr("markerHeight", 16)
		.attr("orient", "auto")
		.attr("markerUnits", "userSpaceOnUse");

		mk.append("svg:path")
		.attr("d", "M0,8 L8,0 L8,16 L0,8 Z")
		.attr("fill", "none")
		.attr("style", "stroke:#555;stroke-width:2;");

		mk.append("svg:path")
		.attr("d", "M6.5,8 L14.5,0 L14.5,16 L6.5,8 Z")
		.attr("fill", "white")
		.attr("style", "stroke:#555;stroke-width:2;");

	var mk = defs.append("svg:marker")
		.attr("id", "double_arrow_right")
		.attr("refX", 0)
		.attr("refY", 8)
		.attr("markerWidth", 16)
		.attr("markerHeight", 16)
		.attr("orient", "auto")
		.attr("markerUnits", "userSpaceOnUse");

		mk.append("svg:path")
		.attr("d", "M0,0 L0,16 L8,8 L0,0 Z")
		.attr("fill", "white")
		.attr("style", "stroke:#555;stroke-width:2;");

		mk.append("svg:path")
		.attr("d", "M6.5,0 L6.5,16 L14.5,8 L6.5,0 Z")
		.attr("fill", "white")
		.attr("style", "stroke:#555;stroke-width:2;");
};

function relativeOffsetY(current, base) {
	return current.top - base.top;
}

function relativeOffsetX(current, base) {
	return current.left - base.left;
}

function getTotalLengthIn( genes ) {
	var length = 0;
	for( var i=0; i<genes.length; i++ ) {
		length += genes[i].gene.length;
	}
	return length;
}


function getWithOfScreenForGene(gene_length, GENE_TOTAL_LENGTH, BACKBONE_LENGTH) {
	var gene_length_ratio = gene_length / GENE_TOTAL_LENGTH;

	var stable_length = (BACKBONE_LENGTH * 0.8)/2;
	var variable_length = (BACKBONE_LENGTH * 0.2) * gene_length_ratio;
	var final_screen_gene_length = stable_length + variable_length;

	return {final_screen_gene_length:final_screen_gene_length, gene_length_ratio:gene_length_ratio};
}

function getLength(obj) {
	return obj.end - obj.start + 1;
}

function isOverlapped( fragment, exon ) {
	var sum = (fragment.end - fragment.start + 1) + (exon.end - exon.start+1);
	var max = Math.max(fragment.end, exon.relativeEnd) - Math.min(fragment.start, exon.relativeStart) + 1;
	
	if( sum > max )	return true;
	
	return false;
}

function isOverlappedPoint( range, point ) {
	if( range.start <= point && range.end >= point )	return true;
	
	return false;
}
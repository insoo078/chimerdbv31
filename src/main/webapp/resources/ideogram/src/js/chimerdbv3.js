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
		html += "<div><string>Strand :</strong> <span style='color:red'>" + d.gene.strand +"</span></div>";
		
		return html;
	});
	
var exonTip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-10, 0])
	.html(function(d) {
		var html = "<div><strong>seqid :</strong> <span style='color:red'>"+d.seqid+"</span></div>";
		html += "<div><strong>Type :</strong> <span style='color:red'>"+d.type+"</span></div>";
		html += "<div><strong>Source :</strong> <span style='color:red'>"+d.source+"</span></div>";
		html += "<div><strong>Start :</strong> <span style='color:red'>"+d.start+"</span></div>";
		html += "<div><strong>End :</strong> <span style='color:red'>"+d.end+"</span></div>";
		html += "<div><strong>Strand :</strong> <span style='color:red'>"+d.strand+"</span></div>";
		html += "<div><strong>No. :</strong> <span style='color:red'>"+d.elementIndex+"</span></div>";

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
	
	if( !this.config.currentXPos ) {
		this.config.currentXPos = 0;
	}
	
	if( !this.config.zoom ) {
		this.config.zoom = 2;
	}
	
	if( !this.config.currentBasePos ) {
		this.config.currentBasePos = 1;
	}
	
	if( !this.config.MARGIN_BETWEEN_BACKBONES ) {
		this.config.MARGIN_BETWEEN_BACKBONES = 10 * this.config.sideMargin;
	}
	
	if( !this.config.DOMAIN_COLOURS ) {
		this.config.DOMAIN_COLOURS = ["#F7819F", "#D0F5A9", "#A9D0F5", "#AC58FA", "#F7FE2E", "#DF0101", "", "", "", "", "", "", ""];
	}
	
	if( !this.config.PFAM_DOMAIN_MAP ) {
		this.config.PFAM_DOMAIN_MAP = [];
	}
	
	this.init( this.config );

	this.initDefs();

	var isAllowedReversed = true;
	var drawingType = 1;
	var isPacked = true;
	var isConservedPfamDomainColor = true;

	this.drawEachGeneAreaLabel( this.config );
	this.drawGeneLabel( this.config );
	this.drawMessagerRnaIdLabel( this.config );
	this.drawChromosomeLabel( this.config );

	this.drawGeneStructure( this.config, drawingType, isAllowedReversed, isPacked, isConservedPfamDomainColor );

	this.drawFusionGeneStructure( this.config, drawingType, isAllowedReversed, isPacked, isConservedPfamDomainColor );
};


ChimeraDbV3ViewerWithOutChromosome.prototype.init = function( config ) {
	// Gene length
	this.config.GENE_TOTAL_LENGTH = this.getTotalLengthIn( config.fusion_genes );
	this.config.SCREEN_BACKBONE_AREALENGTH = ((config.canvas.node().getBoundingClientRect().width - config.LEFT_MARGIN) * config.zoom) - config.MARGIN_BETWEEN_BACKBONES;
	
	var drawingObj = {};
	for(var i=0; i<config.fusion_genes.length; i++) {
		var obj = config.fusion_genes[i];
		
		var transcriptExons = obj.gene.canonicalTranscript.exons;
		
		var wholeExonLength = 0;
		for(var j=0; j<transcriptExons.length; j++){
			wholeExonLength += this.getLength(transcriptExons[j]);
		}

		var eachGeneLength = this.getLength( obj.gene );
		var screenObj = this.getWithOfScreenForGene( config, eachGeneLength, this.config.GENE_TOTAL_LENGTH, this.config.SCREEN_BACKBONE_AREALENGTH );
		var wholeIntronLength = (wholeExonLength * 0.2) / 0.8;
		var final_gene_length = wholeExonLength + wholeIntronLength;			// modified gene length with shorten intron size
		var final_unit_nt_size = screenObj.final_screen_gene_length / final_gene_length;	// calculate each nucleotide uni length
		var no_of_intron_size = wholeIntronLength / (transcriptExons.length+1);

		drawingObj[obj.type] = { gene_length:eachGeneLength, screenObj:screenObj, exon_length:wholeExonLength, whole_intron_length:wholeIntronLength, final_unit_nt_size:final_unit_nt_size, no_of_intron_size:no_of_intron_size };
	}
	this.config.drawingObj = drawingObj;
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawFusionGeneLabel= function( config, labelData ){
	var canvasRect = this.config.canvas.node().getBoundingClientRect();

	var label = this.config.canvas.insert("g", ":first-child").attr("id", "fused-gene-structure-label");
	
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
				return canvasRect.width - (d.startX + d.width) - (1*config.sideMargin);
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

ChimeraDbV3ViewerWithOutChromosome.prototype.drawFusionGenePfamdomains = function( config, isAllowedReverse, isPacked, isConservedPfamDomainColor ) {
	var fusedExons = config.fusionInfo.fusedExons;

//	var DOMAINS_HEIGHT = -9999;
	// Drawing domains of fusion structure
	for( var i=0; i<config.fusion_genes.length;i++) {
		var obj = config.fusion_genes[i];
		
		var exons = fusedExons[obj.type==='5pGene'?"5'":"3'"];

		var exonPos = config.fusedExonsOnScreen[obj.type];

		var parentGroup = d3.select("#fused-gene-backbone-"+obj.type);

		var domainGroup = parentGroup.append("g").attr("class", "fused-domain-group-"+obj.type);

		var yPos = d3.select("#fused-gene-backbone-line-"+obj.type).attr("y1") - (config.EXON_HEIGHT/2);

		for(var j=0; j<obj.gene.pFamDomainList.length; j++ ) {
			var domainFragments = obj.gene.pFamDomainList[j].fragments;

			var relativeY = isPacked===false?(j+1):(obj.gene.pFamDomainList[j].layerNo+1);
			
			var DOMAIN_COLOR = config.DOMAIN_COLOURS[j];
			if( isConservedPfamDomainColor )
				DOMAIN_COLOR = config.DOMAIN_COLOURS[ config.PFAM_DOMAIN_MAP.indexOf(obj.gene.pFamDomainList[j].name ) ];

			var domainLayerGroup = null;
			var isFirst = {flag:false, startX:-1};
			for(var k=0; k<domainFragments.length; k++) {
				var fragment = domainFragments[k];
				
				var isoverlapped = false;
				
				for(var t=0; t<exons.length; t++) {
					var exon = exons[t];

					isoverlapped = isOverlapped( fragment, exon );
					if( isoverlapped ) {
						break;
					}
				}
				if( isoverlapped ) {
					var kk = domainGroup.select("#fused-domain-group-" + obj.type + "-" + j).node();
					if( kk === null ) {
						domainLayerGroup = domainGroup.append("g").attr("id", "fused-domain-group-" + obj.type + "-" + j);
					}

					if ( domainLayerGroup ) {
						var pos = exonPos.exons[ exon.elementIndex ];

						domainLayerGroup.append("rect")
						.classed("domain-feature-rect", true)
						.attr("fill", DOMAIN_COLOR)
						.attr("rx", 2)
						.attr("ry", 2)
						.attr("x", pos.x1)
						.attr("y", yPos +  ((relativeY * (config.EXON_HEIGHT + 5) )))
						.attr("width", pos.width)
						.attr("height", config.EXON_HEIGHT);

						if( isFirst.flag === false ) {
							isFirst.startX = pos.x1;
							isFirst.flag = true;
						}
					}
				}
			}

			if( domainLayerGroup ) {
//				if( (yPos +  ((relativeY * (config.EXON_HEIGHT + 5) ))) > DOMAINS_HEIGHT )
//					DOMAINS_HEIGHT = (yPos +  ((relativeY * (config.EXON_HEIGHT + 5) )));
				
				var domainLayerGroupRect = domainLayerGroup.node().getBBox();

				var domainLayerLabelGroup = domainGroup.append("g").attr("id", "fused-domain-label-group-" + obj.type + "-" + j);
				if( domainFragments[j] ) {
					
					domainLayerLabelGroup.append("text")
							.attr("text-anchor", "end")
							.attr("dominant-baseline", "central")
							.attr("x", isAllowedReverse===true?domainLayerGroupRect.x - 5:(isFirst.startX - 5))
							.attr("y", domainLayerGroupRect.y + (domainLayerGroupRect.height/2))
							.text( !domainFragments[j] ? "": domainFragments[j].name );
					;
				}
			}
		}
	}

//	d3.select("svg").attr("height", DOMAINS_HEIGHT + 30);
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawFusionGeneExons = function( config ) {
	var canvas = config.drawingSvg;
	var canvasRect = canvas.node().getBBox();
	var fusedExons = config.fusionInfo.fusedExons;

	var fused = [{type:'5pGene', exons:fusedExons["5'"]}, {type:'3pGene', exons:fusedExons["3'"]}];

	var gene5p = config.fusionInfo.fusionGene5p;
	var gene3p = config.fusionInfo.fusionGene3p;
	
	var gene5Junc = config.fusionInfo.gene5Junc.split(":")[1];
	var gene3Junc = config.fusionInfo.gene3Junc.split(":")[1];
	
	var lenJunction5p = gene5Junc - gene5p.start + 1;
	var lenJunction3p = gene3p.end - gene3Junc + 1;

	if( gene5p.strand==='-' ) {
		lenJunction5p = gene5p.end - gene5Junc + 1;
	}
	if( gene3p.strand==='-' ) {
		lenJunction3p = gene3Junc - gene3p.start + 1;
	}
	
	var gene_total_length = lenJunction5p + lenJunction3p;
	var geneBackbonLength = config.SCREEN_BACKBONE_AREALENGTH;

	var orginalGeneStructureRect = d3.select("#each-gene-structure-label").node().getBBox();
	
	var startX = config.sideMargin - config.currentXPos;
	
	var y = orginalGeneStructureRect.y + config.MARGIN_BETWEEN_BACKBONES;

	var onScreen= {};
	for(var i=0; i<fused.length; i++) {
		var type = fused[i].type;
		var exons = fused[i].exons;
	
		var gene_length = (type==='5pGene')?lenJunction5p:lenJunction3p;
		var gene_length_ratio = gene_length / gene_total_length;

		var stable_length = ((geneBackbonLength/2) * 0.7);
		var variable_length = (((geneBackbonLength/2) * 0.3) * 2) * gene_length_ratio;

		var final_screen_gene_length = stable_length + variable_length;

		var wholeExonLength = 0;
		for(var j=0; j<exons.length; j++){
			wholeExonLength += exons[j].end - exons[j].start + 1;
		}

		var wholeIntronLength = (wholeExonLength * 0.2) / 0.8;		// Fixed each intron size

		var final_gene_length = wholeExonLength + wholeIntronLength;			// modified gene length with shorten intron size
		var final_unit_nt_size = final_screen_gene_length / final_gene_length;	// calculate each nucleotide uni length

		var no_of_intron_size = wholeIntronLength / (exons.length+1);

		var exonPos = {};
		var INTRON_UNIT_WIDTH = (1 * no_of_intron_size) * final_unit_nt_size;
		
		var parentGroup = d3.select("#fused-gene-backbone-"+type);

		var exonGroup = parentGroup.append("g").attr("class", "fused-gene-exon-group-"+type);
		var x1 = startX + INTRON_UNIT_WIDTH;
		exonGroup.selectAll("path")
				.data(exons)
				.enter()
				.append("path")
				.classed("exon-feature-rect", true)
				.classed("exon-feature-3p", type==="3pGene"?true:false)
				.classed("exon-feature-5p", type==="5pGene"?true:false)
				.attr("d", function(d, i){
					var realExonLength = d.end - d.start + 1;

					var ratio = realExonLength/(wholeExonLength/exons.length);
					var stable_length = (wholeExonLength / exons.length) * 0.7;
					var variable_length = ((wholeExonLength / exons.length) * 0.3) * ratio;

					var onlyLength = stable_length + variable_length;

					var width = onlyLength * final_unit_nt_size;

					var points = "M"+x1+","+(y-10)+" L" + (x1+width) +","+(y-10)+" L"+(x1+width)+","+(y+10)+" L"+x1+","+(y+10)+ " Z";
					
					exonPos[ d.elementIndex ] = {x1:x1, width:width};
					
					x1 += width + INTRON_UNIT_WIDTH;

					return points;
				})
				;
				
		exonGroup.selectAll("text")
				.data(exons)
				.enter()
				.append("text")
				.attr("text-anchor", "middle")
				.attr("dominant-baseline", "central")
				.attr("x", function(d, i){
					var x1 = exonPos[d.elementIndex].x1;
					var width = exonPos[d.elementIndex].width;

					return (x1 + (width/2));
				})
				.attr("y", y)
				.text( function(d, i){ return d.elementIndex; } );
				
		onScreen[type] = {exons:exonPos};
		startX += final_screen_gene_length;
	}
	config.fusedExonsOnScreen = onScreen;
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawFusionGeneBackbone = function( config ) {
	var canvas = config.drawingSvg;
	var canvasRect = canvas.node().getBBox();

	var fusedExons = config.fusionInfo.fusedExons;

	var fused = [{type:'5pGene', exons:fusedExons["5'"]}, {type:'3pGene', exons:fusedExons["3'"]}];

	var gene5p = config.fusionInfo.fusionGene5p;
	var gene3p = config.fusionInfo.fusionGene3p;
	
	var gene5Junc = config.fusionInfo.gene5Junc.split(":")[1];
	var gene3Junc = config.fusionInfo.gene3Junc.split(":")[1];
	
	var lenJunction5p = gene5Junc - gene5p.start + 1;
	var lenJunction3p = gene3p.end - gene3Junc + 1;

	if( gene5p.strand==='-' ) {
		lenJunction5p = gene5p.end - gene5Junc + 1;
	}
	if( gene3p.strand==='-' ) {
		lenJunction3p = gene3Junc - gene3p.start + 1;
	}
	
	var gene_total_length = lenJunction5p + lenJunction3p;
	var startX = config.sideMargin - config.currentXPos;
		
	var backbone = canvas.append("g").attr("id", "fused-gene-backbone-group");

	var orginalGeneStructureRect = d3.select("#each-gene-structure-label").node().getBBox();

	var y = orginalGeneStructureRect.y + config.MARGIN_BETWEEN_BACKBONES;

	var backbone_color = ["#555", "#f7e"];
	for(var i=0; i<fused.length; i++) {
		var type = fused[i].type;

		var gene_length = (type==='5pGene')?lenJunction5p:lenJunction3p;
		var gene_length_ratio = gene_length / gene_total_length;

		var stable_length = ((config.SCREEN_BACKBONE_AREALENGTH/2) * 0.7);
		var variable_length = (((config.SCREEN_BACKBONE_AREALENGTH/2) * 0.3) * 2) * gene_length_ratio;

		var final_screen_gene_length = stable_length + variable_length;

		var backboneLine = backbone.append("g").attr("id", "fused-gene-backbone-" + type);
				
		var lineObj = backboneLine.append('line')
		.attr("id", "fused-gene-backbone-line-" + type)
		.attr('x1', startX)
		.attr('y1', y)
		.attr('x2', startX + final_screen_gene_length )
		.attr("y2", y)
		.attr("style", "stroke:"+backbone_color[i]+";stroke-width:5;")
		.attr("marker-end", function(d){
			if( type==="3pGene" ) {
				return "url(#double_arrow_right)";
			}
		});

		try {
			var breakPoint = d3.select("#breakpoint-line-"+type);

			backboneLine.append("line")
				.attr("x1", breakPoint.attr("x1"))
				.attr("y1", config.GENE_BACKBONE_Y)
				.attr("x2", type === '5pGene'?lineObj.attr("x2"):lineObj.attr("x1"))
				.attr("y2", lineObj.attr("y1"))
				.attr("style", "stroke:#00f;stroke-width:1;")
				.style("stroke-dasharray", ("2,3"));
		}catch(e) {
			console.log(e);
		}

		startX += final_screen_gene_length;
	}
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawFusionGeneStructure = function(config, drawingType, isAllowedReverse, isPacked, isConservedPfamDomainColor ) {
	this.drawFusionGeneBackbone( config );
	this.drawFusionGeneExons( config );
	this.drawFusionGenePfamdomains( config, isAllowedReverse, isPacked, isConservedPfamDomainColor );
	
	var heightVal5p = d3.select(".fused-domain-group-5pGene").node().getBBox().height;
	var heightVal3p = d3.select(".fused-domain-group-3pGene").node().getBBox().height;

	var domainAreaHeight = Math.max(heightVal5p, heightVal3p);

	var orginalGeneStructureRect = d3.select("#fused-gene-backbone-line-5pGene").node().getBBox();
	var y = orginalGeneStructureRect.y + parseFloat(config.drawingSvg.attr("y"));

	var labelData = [
		{name:"Gene", startX:config.sideMargin, startY:y-15, width:(config.LEFT_MARGIN - (5*config.sideMargin)), height:30}
		,{name:"Domain", startX:config.sideMargin, startY:(y + 15 + 2), width:(config.LEFT_MARGIN - (5*config.sideMargin)), height:domainAreaHeight + 5}
	];
	
	this.drawFusionGeneLabel( config, labelData );
};


/***** Each Gene area functions **************************************************************/

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
	var canvas = this.config.drawingSvg;
	var canvasRect = canvas.node().getBoundingClientRect();
	
	config.GENE_BACKBONE_Y = 100;

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

				var x1 = 0 - config.currentXPos;
				var y1 = config.GENE_BACKBONE_Y;
				var x2 = screenObj.final_screen_gene_length;
				var y2 = config.GENE_BACKBONE_Y;

				if( d.type === "3pGene" ) {
					var backbone5pGeneRect = d3.select("#fusion-gene-backbone-5pGene").node().getBoundingClientRect();

					x1 = relativeOffsetX(backbone5pGeneRect, canvasRect) + backbone5pGeneRect.width + (config.MARGIN_BETWEEN_BACKBONES/2);
				}

				x2 += x1;
				
				// backbone의 시작위치를 지정함
				config.drawingObj[d.type].startX = x1;

				return "M"+x1+","+y1+" L"+x2+","+y2;
			})
			.attr("marker-end", function(d, i){
				if( isAllowedReverse === true ) {
					return "url(#double_arrow_right)";
				}else {
					if( d.gene.strand === '+' )
						return "url(#double_arrow_right)";
					return "url(#double_arrow_left)";
				}
			});
			
	return backbone;
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawExons = function( config, backbone, drawingType, isAllowedReverse ) {
	var canvas = this.config.drawingSvg;
	
	config.EXON_HEIGHT = 20;
	config.EXON_Y_POS = config.GENE_BACKBONE_Y - (config.EXON_HEIGHT/2);
	
	var viewer = this;
	var onScreen= {};
	for( var j=0; j<config.fusion_genes.length; j++) {
		var obj = config.fusion_genes[j];

		var exonGroup = backbone.select("#fusion-gene-backbone-" + obj.type).append("g").attr("class", "exon-group-" + obj.type);

		var transcriptExons = obj.gene.canonicalTranscript.exons;

		if( isAllowedReverse !== true ) {
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
					var realExonLength = viewer.getLength(d);
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

ChimeraDbV3ViewerWithOutChromosome.prototype.drawPfamdomains= function( config, backbone, isAllowedReverse, isPacked, isConservedPfamDomainColor ) {
	var canvas = config.drawingSvg;
	var canvasRect = canvas.node().getBoundingClientRect();
	
	var rootRect = config.canvas.node().getBoundingClientRect();
			
	for( var i=0; i<config.fusion_genes.length; i++) {
		var obj = config.fusion_genes[i];
		var transcriptExons = obj.gene.canonicalTranscript.exons;

		var domainGroup = backbone.select("#fusion-gene-backbone-" + obj.type).append("g").attr("class", "domain-group-" + obj.type);
	
		var exonPos = config.exonsOnScreen[obj.type];

		for(var j=0; j<obj.gene.pFamDomainList.length; j++ ) {
			if( config.PFAM_DOMAIN_MAP.indexOf(obj.gene.pFamDomainList[j].name ) === -1 )
				config.PFAM_DOMAIN_MAP.push( obj.gene.pFamDomainList[j].name );
			
			var DOMAIN_COLOR = config.DOMAIN_COLOURS[j];
			if( isConservedPfamDomainColor )
				DOMAIN_COLOR = config.DOMAIN_COLOURS[ config.PFAM_DOMAIN_MAP.indexOf(obj.gene.pFamDomainList[j].name ) ];

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

						var relativeY = isPacked===false?(j+1):(obj.gene.pFamDomainList[j].layerNo+1);

						domainLayerGroup.append("rect")
						.classed("domain-feature-rect", true)
						.attr("fill", DOMAIN_COLOR)
						.attr("rx", 2)
						.attr("ry", 2)
						.attr("x", pos.x1)
						.attr("y", config.EXON_Y_POS + (relativeY * (config.EXON_HEIGHT + 5) ) )
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
				var ny = config.GENE_BACKBONE_Y;
				
				var nx = relativeOffsetX( domainLayerGroupRect, canvasRect ) - config.currentXPos;

				domainLayerLabelGroup.append("text")
						.attr("text-anchor", "end")
						.attr("dominant-baseline", "central")
						.attr("x", isAllowedReverse===true?nx - 5:(isFirst.startX - 5))
						.attr("y", ny + relativeOffsetY(domainLayerGroupRect, canvasRect) )
						.text( !domainFragments[j] ? "": domainFragments[j].name );
				;
			}
		}
	}
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawLabel= function( config, labelData ){
	var canvasRect = this.config.canvas.node().getBoundingClientRect();

	var label = this.config.canvas.insert("g", ":first-child").attr("id", "each-gene-structure-label");
	
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
				var h = parseFloat(d3.select("#inner_svg").attr("y"));
				var val = d.startY + h;
				return val;
			})
			.attr("width", function(d){
				return canvasRect.width - (d.startX + d.width) - (1*config.sideMargin);
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
				var h = parseFloat(d3.select("#inner_svg").attr("y"));
				var val = d.startY + h;
				return val;
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
		.attr("dominant-baseline", "central")
		.attr("x",function(d){return d.startX + d.width/2;})
		.attr("y", function(d){
			var h = parseFloat(d3.select("#inner_svg").attr("y"));
			var val = d.startY + h;
			return val + (d.height/2);
		} )
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
			}else if( previous !== null && exon.end < point && previous.start > point ){
				var pos = exonPos.exons[ exon.elementIndex ];
				var posPrev = exonPos.exons[previous.elementIndex];
				breakPointX = (posPrev.x1 + posPrev.width) + (pos.x1 - posPrev.x1 - posPrev.width)/2;

				break;
			}

			previous = exon;
		}
		
		var breakPoint = backbone.select("#fusion-gene-backbone-" + obj.type).append("g");
		breakPoint.append("line")
				.attr("id", "breakpoint-line-" + obj.type)
				.attr("x1", breakPointX)
				.attr("y1", config.GENE_BACKBONE_Y - 50)
				.attr("x2", breakPointX)
				.attr("y2", config.GENE_BACKBONE_Y - 12)
				.attr("style", "stroke:#555;stroke-width:1;")
				.attr("marker-end", "url(#arrow)");
		;

		breakPoint.append("text")
		.attr("class", "break-point-label")
		.style("font-size", "14px")
		.attr("text-anchor", "middle")
		.attr("dominant-baseline", "bottom")
		.attr('x', breakPointX)
		.attr('y', config.GENE_BACKBONE_Y - 60)
		.text( obj.gene.chromosome + ":" + point );
	}
};

ChimeraDbV3ViewerWithOutChromosome.prototype.drawGeneStructure = function( config, drawingType, isAllowedReverse, isPacked, isConservedPfamDomainColor ) {
	this.drawUnitLengthOfEachGene( config );

	config.drawingSvg = config.canvas.append("svg").attr("id", "inner_svg").attr("width", 970).attr("x", config.LEFT_MARGIN).attr("y", 160);
	
	var backbone = this.drawDonorGeneBackbone( config, isAllowedReverse );
	this.drawExons( config, backbone, drawingType, isAllowedReverse );
	this.drawPfamdomains( config, backbone, isAllowedReverse, isPacked, isConservedPfamDomainColor );

	var heightVal5p = d3.select(".domain-group-5pGene").node().getBBox().height;
	var heightVal3p = d3.select(".domain-group-3pGene").node().getBBox().height;

	var domainAreaHeight = Math.max(heightVal5p, heightVal3p);

	var labelData = [
		{name:"Gene", startX:config.sideMargin, startY:(config.GENE_BACKBONE_Y - 15), width:(config.LEFT_MARGIN - (5*config.sideMargin)), height:30}
		,{name:"Domain", startX:config.sideMargin, startY:(config.GENE_BACKBONE_Y + 15 + 2), width:(config.LEFT_MARGIN - (5*config.sideMargin)), height:domainAreaHeight + 5}
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
				if( i===1 ) x -= 40;

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

ChimeraDbV3ViewerWithOutChromosome.prototype.getTotalLengthIn = function( genes ) {
	var length = 0;
	for( var i=0; i<genes.length; i++ ) {
		length += genes[i].gene.length;
	}
	return length;
};

ChimeraDbV3ViewerWithOutChromosome.prototype.getLength = function( obj ) {
	return obj.end - obj.start + 1;
};

ChimeraDbV3ViewerWithOutChromosome.prototype.getConfig = function() {
	return this.config;
};

ChimeraDbV3ViewerWithOutChromosome.prototype.getWithOfScreenForGene = function( config, gene_length, GENE_TOTAL_LENGTH, SCREEN_BACKBONE_AREALENGTH ) {
	var gene_length_ratio = gene_length / GENE_TOTAL_LENGTH;

	var stable_length = (SCREEN_BACKBONE_AREALENGTH * 0.8)/2;
	var variable_length = (SCREEN_BACKBONE_AREALENGTH * 0.2) * gene_length_ratio;
	var final_screen_gene_length = stable_length + variable_length;

	return {final_screen_gene_length:final_screen_gene_length, gene_length_ratio:gene_length_ratio};
};

function relativeOffsetY(current, base) {
	return current.top - base.top;
}

function relativeOffsetX(current, base) {
	return current.left - base.left;
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
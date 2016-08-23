/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package org.com.chimerdbv31.common.vo;

/**
 *
 * @author Ik-Jung Choi <cij@ewha.ac.kr>
 */
public class ParamVo {
    private String activatedTab;  
    private String searchType;
    private String dataForSearchType;
    private boolean gene5;
    private boolean gene3;
    
    private String queryForSearch;
    
    //chimerKB
    private String queryForWebSource;
    private String queryForBreakPointType;
    private String queryForValidationMtd;
    
    //chimerSeq
    private String queryForSource;
    private String queryForCancerType;
    
    private String valForSeed_reads;
    private String valForSpanning_pairs;
    private String valForJunc_reads;
    
    
    //filter
    private String queryForFilterByFunc;
    private String queryForFusType;
    private String queryForSupInfo;
    
    // paging
    private int pagn;
    private int strtn;
    private int lntn;
    private int totaln;
    private String sortedKeyword;
    private String sortType;
    private String insertedKeyword;
    
    public ParamVo(boolean initValForBoolean) {
        if(initValForBoolean){
            this.gene5 = false;
            this.gene3 = false;
        }
    }

    public String getActivatedTab() {
        return activatedTab;
    }

    public void setActivatedTab(String activatedTab) {
        this.activatedTab = activatedTab;
    }

    public String getSearchType() {
        return searchType;
    }

    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }

    public String getDataForSearchType() {
        return dataForSearchType;
    }

    public void setDataForSearchType(String dataForSearchType) {
        this.dataForSearchType = dataForSearchType;
    }

    public boolean isGene5() {
        return gene5;
    }

    public void setGene5(boolean gene5) {
        this.gene5 = gene5;
    }

    public boolean isGene3() {
        return gene3;
    }

    public void setGene3(boolean gene3) {
        this.gene3 = gene3;
    }

    public String getQueryForSearch() {
        return queryForSearch;
    }

    public void setQueryForSearch(String queryForSearch) {
        this.queryForSearch = queryForSearch;
    }

    public String getQueryForWebSource() {
        return queryForWebSource;
    }

    public void setQueryForWebSource(String queryForWebSource) {
        this.queryForWebSource = queryForWebSource;
    }

    public String getQueryForSource() {
        return queryForSource;
    }

    public void setQueryForSource(String queryForSource) {
        this.queryForSource = queryForSource;
    }

    public String getQueryForBreakPointType() {
        return queryForBreakPointType;
    }

    public void setQueryForBreakPointType(String queryForBreakPointType) {
        this.queryForBreakPointType = queryForBreakPointType;
    }

    public String getQueryForValidationMtd() {
        return queryForValidationMtd;
    }

    public void setQueryForValidationMtd(String queryForValidationMtd) {
        this.queryForValidationMtd = queryForValidationMtd;
    }

    public String getQueryForCancerType() {
        return queryForCancerType;
    }

    public void setQueryForCancerType(String queryForCancerType) {
        this.queryForCancerType = queryForCancerType;
    }

    public String getValForSeed_reads() {
        return valForSeed_reads;
    }

    public void setValForSeed_reads(String valForSeed_reads) {
        this.valForSeed_reads = valForSeed_reads;
    }

    public String getValForSpanning_pairs() {
        return valForSpanning_pairs;
    }

    public void setValForSpanning_pairs(String valForSpanning_pairs) {
        this.valForSpanning_pairs = valForSpanning_pairs;
    }

    public String getValForJunc_reads() {
        return valForJunc_reads;
    }

    public void setValForJunc_reads(String valForJunc_reads) {
        this.valForJunc_reads = valForJunc_reads;
    }


    public String getQueryForFilterByFunc() {
        return queryForFilterByFunc;
    }

    public void setQueryForFilterByFunc(String queryForFilterByFunc) {
        this.queryForFilterByFunc = queryForFilterByFunc;
    }

    public String getQueryForFusType() {
        return queryForFusType;
    }

    public void setQueryForFusType(String queryForFusType) {
        this.queryForFusType = queryForFusType;
    }

    public String getQueryForSupInfo() {
        return queryForSupInfo;
    }

    public void setQueryForSupInfo(String queryForSupInfo) {
        this.queryForSupInfo = queryForSupInfo;
    }

    public int getPagn() {
        return pagn;
    }

    public void setPagn(int pagn) {
        this.pagn = pagn;
    }

    public int getStrtn() {
        return strtn;
    }

    public void setStrtn(int strtn) {
        this.strtn = strtn;
    }

    public int getLntn() {
        return lntn;
    }

    public void setLntn(int lntn) {
        this.lntn = lntn;
    }

    public int getTotaln() {
        return totaln;
    }

    public void setTotaln(int totaln) {
        this.totaln = totaln;
    }

    public String getSortedKeyword() {
        return sortedKeyword;
    }

    public void setSortedKeyword(String sortedKeyword) {
        this.sortedKeyword = sortedKeyword;
    }

    public String getSortType() {
        return sortType;
    }

    public void setSortType(String sortType) {
        this.sortType = sortType;
    }

    public String getInsertedKeyword() {
        return insertedKeyword;
    }

    public void setInsertedKeyword(String insertedKeyword) {
        this.insertedKeyword = insertedKeyword;
    }

    
    
    
    
    
    
}


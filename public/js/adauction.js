console.log("Begin Adworks script...");

//initialize variables
int numAdv = db.advertisement.count();
var qualityScore= {};
var adRank = [];
var topRanked = 4;
 
console.log("Num adv: " + numAdv);

 
//calculate quality score
for (var i = 0; i < numAdv; i++){
	//for advertiser (aid) get scores.p(i)*advertisement.aid("cpc")
 	
    //ping current time and advertisement.aid("lastAccessed")
 
    //order by top 30 and give .1 if true
 
    //regex query check if did == advertisement.aid.advName add .
 
    //combine categories and store in qualityScore map
               
 MAX = (CPC*QualityScore)*.6 + (lastaccess/currenttime)*.15 + (top30%)*.20 + (adNameInUrl)*.05

}
 
//caclulate cost for ads
for (var j = 0; j < topRanked; j++){
 
    //adrank person below/quality score +.01
    
 
 
 
}
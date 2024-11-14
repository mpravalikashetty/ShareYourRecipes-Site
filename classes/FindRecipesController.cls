/**
 * @description       : FindRecipesController
 with columns Recipe_Name__c,Servings__c,Ready_In_Minutes__c,Is_Dairy_Free__c,Is_Gluten_Free__c,Image__c(picture of the recipe),Recipe_Link__c(link of any blog which has the detail recipe),Summary__c(Summary related to the recipe),Procedure__c(cooking steps of the recipe),Ingredients__c(things needed for this recipe)....so these are the columns...so create the data on your own which is relevent to the above columns i have explained the columns title inside peranthesis
**/
public with sharing class FindRecipesController {
    @AuraEnabled
    public static string fetchAPIRecipes(String searchKey){
        try {
            //+'apiKey=fa6b30c3b6f54669922f115cd8fa6308'
            HTTPRequest request=new HTTPRequest();
            HTTPResponse response=new HTTPResponse();
            request.setHeader('Content-type','application/json');
            request.setEndPoint('https://api.spoonacular.com/recipes/findByIngredients?ingredients='+searchKey+'&apiKey=fa6b30c3b6f54669922f115cd8fa6308');
            request.setMethod('GET');
            HTTP http=new HTTP();
            response=http.send(request);
            if(response.getStatusCode()==200 && response.getBody()!=null){
                System.debug('response-->'+response.getBody());
                if(response.getBody()=='[]'){
                    return null;
                }
                return response.getBody();
            }
            else{
                return null;
            }
            
        }catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static string getFullRecipe(String Id){
        try {
            HTTPRequest request=new HTTPRequest();
            HTTPResponse response=new HTTPResponse();
            request.setHeader('Content-type','application/json');
            request.setEndPoint('https://api.spoonacular.com/recipes/'+Id+'/information?apiKey=fa6b30c3b6f54669922f115cd8fa6308');
            request.setMethod('GET');
            HTTP http=new HTTP();
            response=http.send(request);
            if(response.getStatusCode()==200){
                System.debug('response-->'+response.getBody());
                return response.getBody();
            }else{
                return null;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static New_Recipe__c fetchRecipefromDatabase(String name){
        try {
            String likeName='%'+name+'%';
            New_Recipe__c newRecipesItem= [Select Recipe_Name__c,Ready_In_Minutes__c,Is_Dairy_Free__c,Is_Gluten_Free__c,Summary__c,Image__c,Servings__c,Ingredients__c,Procedure__c from New_Recipe__c Where (Recipe_Name__c Like :likeName or Ingredients__c Like :likeName) and Status__c='Approved' order by createdDate Limit 1];
            if(newRecipesItem!=null){
                return newRecipesItem;
            }
            return null;
        } catch (Exception e) {
            system.debug('46-->'+e.getMessage());
            if(e.getMessage().contains('List has no rows for assignment to SObject')){
                system.debug('60-->');
                return null;
            }else{
                system.debug('63-->');
                throw new AuraHandledException(e.getMessage());
            }
        }
    }
}
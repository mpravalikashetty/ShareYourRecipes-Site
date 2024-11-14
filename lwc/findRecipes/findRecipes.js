import { LightningElement } from 'lwc';
import fetchRecipes from '@salesforce/apex/FindRecipesController.fetchAPIRecipes';
import getFullRecipe from '@salesforce/apex/FindRecipesController.getFullRecipe';
import fetchRecipefromDatabase from '@salesforce/apex/FindRecipesController.fetchRecipefromDatabase';
import FoodBanner from '@salesforce/resourceUrl/FoodBanner';
import shareRecipeImage from '@salesforce/resourceUrl/shareRecipeImage';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ToastContainer from 'lightning/toastContainer';
import FORM_FACTOR from '@salesforce/client/formFactor';
export default class FindRecipes extends LightningElement {
    ingredientKey;
    foundedRecipes;
    fullRecipe;
    showSummary=false;
    foundRecipesLen;
    currentIndex=0;
    rec;
    hasNextItemDisabled=false;
    hasPreviousItemDisabled=true;
    showViewRecipeBtn=true;
    showOutOfService=false;
    bannerUrl=FoodBanner;
    shareRecipeImageUrl=shareRecipeImage;
    showAllRecipes=false;
    showShareRecipeScreen=false;
    //share recipes start
    recipeName;
    recipeLink;
    summary;
    ingredients;
    procedure;
    //share recipes stop
    showDB=false;
    loading=false;
    toastContainer;
    mobile=false;
    get bgStyle(){
        return `background-image:url(${this.bannerUrl}); background-size:cover;background-position:center;
        height:260px;font-size:50px;font-weight:bold;padding:20px;display:flex;align-items:center;justify-content:center;`
    }
    connectedCallback() {
        this.toastContainer = ToastContainer.instance();  
        (FORM_FACTOR==='Small' || FORM_FACTOR==='Medium') ? this.mobile = true : this.mobile = false; 
        console.log('MOBILe is??',this.mobile); 
    }
    handleIngredient(event){
        this.ingredientKey=event.target.value;
        this.rec=null;
        this.showAllRecipes=false;
    }
    handleSearch(){
        if(this.ingredientKey!=null && this.ingredientKey!=undefined && this.ingredientKey!=''){
        this.loading=true;
        fetchRecipes({searchKey:this.ingredientKey}).then(result=>{
            this.foundedRecipes=JSON.parse(result);
            console.log(' this.foundedRecipes', this.foundedRecipes);
            if(this.foundedRecipes!=null && this.foundedRecipes!=undefined && this.foundedRecipes!=''){
                this.foundRecipesLen=this.foundedRecipes.length;
                this.getcurrentItem();
                this.loading=false;
            }else{
                fetchRecipefromDatabase({name:this.ingredientKey}).then(result=>{
                    console.log('results48-->',result);
                    this.foundedRecipesFromDB=result;
                    if(this.foundedRecipesFromDB!=null && this.foundedRecipesFromDB!=undefined && this.foundedRecipes!=''){
                         this.showDB=true;
                        this.loading=false;
                    }else if(this.foundedRecipes==null && (this.foundedRecipesFromDB==null|| this.foundedRecipes==undefined)){
                        this.loading=true;
                        if(this.mobile){
                            const event=new ShowToastEvent({
                                title:'No recipes found,Kindly share the recipe below!',
                                message:'!',
                                variant:'warning'
                            });
                            this.dispatchEvent(event);  
                        }
                        else{
                            const event1=new ShowToastEvent({
                                title:'No recipes found!',
                                message:'Kindly share the recipe below',
                                variant:'info'
                            });
                            this.dispatchEvent(event1);
                        }
                        setTimeout(()=>{
                            this.loading=false;
                            this.showShareRecipeScreen=true;
                        },2000);
                    }
                    else{
                        this.showOutOfService=true;
                        this.loading=false;
                    }
                }).catch(error=>{
                    this.loading=false;
                    if(this.mobile){
                        const event=new ShowToastEvent({
                            title:error.message,
                            message:'!',
                            variant:'error'
                        });
                        this.dispatchEvent(event);
                    }
                    else{
                        const event1=new ShowToastEvent({
                            title:'Error!',
                            message:error.message,
                            variant:'error'
                        });
                        this.dispatchEvent(event1);
                    }
                    console.log('error occured when fetching from DB',error.message);
                })
            }
        }).catch(error=>{
            this.loading=false;
            this.showOutOfService=true;
            console.log('error occurs-->',JSON.stringify(error.message));
        })
    }else{
        console.log('925-->',this.ingredientKey);
        if(this.mobile){
            const event=new ShowToastEvent({
                title:'Kindly Enter Ingredient or Recipe Name',
                message:'!',
                variant:'error',
            });this.dispatchEvent(event);
        }else{
            const event1=new ShowToastEvent({
                title:'Error!',
                message:'Kindly Enter Ingredient or Recipe Name',
                variant:'error',
            });  this.dispatchEvent(event1);   
        }    
    }
    }
    async handleViewRecipeClick(event){
        this.showViewRecipeBtn=false;
        this.loading=true;
       await getFullRecipe({Id:event.target.dataset.id}).then(result=>{ 
            this.fullRecipe=JSON.parse(result);
            this.loading=false;
            console.log('fullRecipe-->',result);
        }).catch(error=>{
            this.loading=false;
            if(this.mobile){
                const event=new ShowToastEvent({
                    title:error.message,
                    message:'!',
                    variant:'error'
                });
                this.dispatchEvent(event);
            }
            else{
                const event1=new ShowToastEvent({
                    title:'Error!',
                    message:error.message,
                    variant:'error'
                });
                this.dispatchEvent(event1);
            }
            console.log('error occured-->',error.message);
        })

    }
    showNextItem(){
        this.showViewRecipeBtn=true;
        if(this.currentIndex<this.foundRecipesLen-1){
            this.currentIndex+=1;
            this.fullRecipe=null;
            this.hasPreviousItemDisabled=false;
            this.getcurrentItem();
            this.hasNextItem();
        }
    }
    getcurrentItem(){
        if(this.currentIndex==0){
            this.hasPreviousItemDisabled=true;
        }
         this.showViewRecipeBtn=true;
         this.rec=this.foundedRecipes[this.currentIndex];
         this.showDB=false;
    }
    hasNextItem(){
        if(this.currentIndex<this.items.length-1){
            this.hasNextItemDisabled=true;
        }   
    }
    showPreviousItem(){
        console.log('this.current-->',this.currentIndex);
            this.showViewRecipeBtn=true;
            this.currentIndex-=1;
            this.fullRecipe=null;
            this.getcurrentItem();
    }
    showAllItems(){
        this.showAllRecipes=true;
    }
    handleBack(){
        this.ingredientKey=null;
        this.showAllRecipes=false; 
    }
    handleShareBtn(){
        this.loading=true;
        this.showShareRecipeScreen=true;
        setTimeout(()=>{
            this.loading=false;
        },3000);
    }
    handleShareBack(){
        this.ingredientKey=null;
        this.showShareRecipeScreen=false;
    }
    handleInputValues(event){  
        if(event.target.name=="recipeName"){
            this.recipeName=event.target.value;
        }
        else if(event.target.name=="summary"){
            this.summary=event.target.value;
        }
    }
    handleSubmit(){
        this.loading=true;
        console.log('r->',this.recipeName,'s->',this.summary);
        if(this.recipeName!=null && this.recipeName!=undefined && this.recipeName!='' && this.summary!=null && this.summary!=undefined && this.summary!=''){
            if(this.mobile){
                const event=new ShowToastEvent({
                    title:"Thank You! Your recipe successfully submitted for approval",
                    message:"!",
                    variant:"success"
                });
                this.dispatchEvent(event);
            }
            else{
                const event1=new ShowToastEvent({
                    title:"Success!",
                    message:"Thank You! Your recipe successfully submitted for approval",
                    variant:"success"
                });
                this.dispatchEvent(event1);
            }
            setTimeout(()=>{
                this.loading=false;
                this.showShareRecipeScreen=false;
                this.recipeName=null;
                this.summary=null;
                this.recipeLink=null;
            },1000);
        }else{
            if(this.mobile){
                const event=new ShowToastEvent({
                    title:"Kindly enter required values",
                    message:"!",
                    variant:"error"
                });
                this.dispatchEvent(event);
            }
            else{
                const event1=new ShowToastEvent({
                        title:"Error!",
                        message:"Kindly enter required values",
                        variant:"error"
                });
                this.dispatchEvent(event1);
            }
            setTimeout(()=>{
            this.loading=false;
            },1000); 
        }
    }
}
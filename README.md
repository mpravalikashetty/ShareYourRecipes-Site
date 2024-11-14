# ShareYourRecipes-Site
Hi,
Feel free to explore the site by clicking below link:

https://psl250-dev-ed.develop.my.site.com/ShareYourRecipewithPravalika

Note: This site is Desktop and Mobile friendly.


I have developed a LWC component which take input as either ingredient name or recipe name from end user.
Based on that I am fetching recipes from third party API's with information like is it gluten free,diary free, procedure, no of servings, cooking time etc.
If no recipe found then user can submit their own recipe using 'Share your recipe' button.
Once the user submit their recipe, It will undergo a approval process and notify the user via Email when recipe is approved and available for other users.

<b>Step by Step explanation along with Screenshots:</b>

<b>Step 1:</b> Below Image shows the UI of the site
    
  * Enter Ingredient/Recipe Name and click on Search button to get the recipe.
  * Click on 'Share Your Recipe' button to submit your recipe
    
![image](https://github.com/user-attachments/assets/7bb6ae15-3cf5-4059-9cc6-20edfda35789)

<b>Step 2:</b> On click of search button below related recipe will be shown
    
  * Use 'Show Previous Recipe & Show Next Recipe' buttons to change see new recipes
  * Use 'Quick View of All recipes' button to see all recipes in one go
    
![image](https://github.com/user-attachments/assets/2043422c-ad62-4bc2-ae5f-e8fa95787ece)

<b>Step 3:</b> On click of 'Quick View of All Recipes' button UI will look as below 
  
  * You can see all recipes related to searched key word in one go
  * Click on 'Click to go back' button to navigate to UI in step 1.

![image](https://github.com/user-attachments/assets/28944dc6-c14c-4dd2-b1a0-ac556c822c9f)

<b>Step 4:</b> on click of 'Share Your Recipes' buttom below UI will be populated

  * Enter the required details like Recipe Name & Summary
  * Submit the recipe using 'Submit Recipe' button
  * Use 'Click to go back' button to move back to step 1 screen.
    
![image](https://github.com/user-attachments/assets/248a40de-b553-41ee-be4c-5f65594bc8bc)

  <b>Step 5:</b> Toast Messages
  * Below toast fires when no recipe is found with search key in third party as well as sfdc database.
 
![image](https://github.com/user-attachments/assets/2f1730a3-f26e-465e-b90b-4173c2a0ae5e)

 * On susseful submission of user recipe below toast message fires
   
![image](https://github.com/user-attachments/assets/49fe7816-7243-48a0-8169-c0aeabb77128)

 * Required fields missing error toast message when user tries to submit the recipe without entering required fields.

![image](https://github.com/user-attachments/assets/01d436ed-3ace-4fdf-9a34-669e4c2acd83)





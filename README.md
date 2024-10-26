# 5 minute quick homepage/portfolio, deployed to the cloud and your resume is always accessible to you
<img width="1800" alt="Screenshot 2024-10-26 at 02 39 09" src="https://github.com/user-attachments/assets/c40050f6-780b-4af0-8598-93deb0f7f373">

## Requirements
1. Node.js
2. NPM
3. React(if you want to run this locally)
4. Github Account
5. unzip
6. Unix base OS


## Steps
1. Login in to github and create a repository 
2. Clone the repository on your computer
3. Navigate to the directory of the cloned repository
4. Run the following command:
```
curl -O https://raw.githubusercontent.com/karansharmaufl/scripts/refs/heads/main/setup/homepage_setup.sh && bash homepage_setup.sh 
```
5. Update the homepage value in package.json with this value:
https://{github_username}.github.io/{repository_name}
6. Update the src/resources/userConfig.json file with your information
7. Replace the src/resources/resume file.pdf with your resume, the file should be named file.pdf
8. run ```npm start``` to test your changes
9. Push your changes to Github:
```
git add -A
git commit -m "your message"
git push
```
10. Deply your changes to Github Pages:
```
npm run deploy
```
11. Navigate to https://{github_username}.github.io/{repository_name}

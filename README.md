# Twitter Clone
This application a pixel perfect clone of the social media application, Twitter. The Twitter Clone imitates functions such as Tweeting, commenting on Tweets, liking Tweets, retweeting Tweets and following users. 

#### Live Link:  https://twitter-skimby.herokuapp.com/


## Technologies
- JavaScript
- HTML
- CSS
- React/Redux
- Node.js
- Express.js
- Sequelie
- SQlite3
- GIPHY
- PicMo
- Heroku
- AWS

## Site Overview
#### Landing Page
![enter image description here](https://twitter-skimby-bucket.s3.us-east-1.amazonaws.com/Screen%20Shot%202022-10-10%20at%2011.14.14%20AM.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj//////////wEaCXVzLWVhc3QtMiJHMEUCIArHuD%2bmbCPfRfnvlxeMzcO5E7psXOETpUjLdrurprslAiEAwQNQxLjKhLkiS2/5PWEdjtmshGRBybG4MbsSKASyvHUq5AIIYRAAGgw1MDU1NjI3ODM2MzEiDKtEWbVi1WHdvxmyHCrBAp5GYg5RNhODVjxV98SC2SwldXEWItuwJKImDGpNM2JUCp5kTqUkNIk6/u%2bh%2bDjE9ieaBky%2bKuLUuxLz/jhly%2bzlr8SABA98VLqNQJ3%2bBCIpoRMxxMC56DyWJ5ERwReQLZti1NyQko3iP14cFR/xUYrTP86qvLprXz5iyywCYPOMwEy26ljEm7TWwEnMEpbjRql7JiV7/BIbFYHMgCgAwXta0k2LLvz7qOg%2bGBH/5D2De6WD2RIoYz%2bD7KR18mpnnsFgDH4VLUMTWSgWYNhwgSe2nVLN18xwdHD6jKKZUWVNQzOnG0vUngf%2bRxxJfTZ7Lzcs5GcyPVe%2beIg17ZRroSFRJoCbF2KIvNglGZdnhRAN3Slwf%2bMZdE5rh0ShDEFKKxL9kJCNHD8g4fRUpwjMbMWmcsYS9gx2NbwUbQxjzA5RwjCxi5GaBjqzAoJqdEypjVNmNiUeXu0itxyu/tfN3ZZNl80Pmn%2b4t4si21KAOpYEuzkhMoZcfcV3ouknYHt/OIJ/SbpcQwKz0TARC2NRgYQweTDG91hlEOUSYM3%2blaMugy9/2aArfsvmVaH/JSXo4Rd2gDTFjjF43FyXiMZclzkaeFZePf/KhQr46AZZJ%2blwT1U4sGZlLp/VLzEKlM/riK2lMzKmndt271crRJmChyMHG5jzKJShPd%2bkl9LCTLXgHFT0shYi6v19zoZM%2bwZwPBmujhdf5YIWMq5zOzWBOOFRoOAQv3JSu9qV4HGGtBTCmzoyQaisPQADozJg5NROzGRWX5opQSelGGyhgnKjoMsfaDAWYymcq%2bx/qAMI5TkcvgcxGzD2QmfyZy4ZRrEXAFWRmsf8o0jWxqaXSNA=&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221010T162057Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAXLNPD36HZJPTIIQP/20221010/us-east-1/s3/aws4_request&X-Amz-Signature=d9c73d60668ea039495942b04ce489d7139d1e02c54b614a165f9accfea348e1)
#### Logged User Home Page
![enter image description here](https://twitter-skimby-bucket.s3.us-east-1.amazonaws.com/Screen%20Shot%202022-10-10%20at%2011.14.30%20AM.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj//////////wEaCXVzLWVhc3QtMiJHMEUCIArHuD%2bmbCPfRfnvlxeMzcO5E7psXOETpUjLdrurprslAiEAwQNQxLjKhLkiS2/5PWEdjtmshGRBybG4MbsSKASyvHUq5AIIYRAAGgw1MDU1NjI3ODM2MzEiDKtEWbVi1WHdvxmyHCrBAp5GYg5RNhODVjxV98SC2SwldXEWItuwJKImDGpNM2JUCp5kTqUkNIk6/u%2bh%2bDjE9ieaBky%2bKuLUuxLz/jhly%2bzlr8SABA98VLqNQJ3%2bBCIpoRMxxMC56DyWJ5ERwReQLZti1NyQko3iP14cFR/xUYrTP86qvLprXz5iyywCYPOMwEy26ljEm7TWwEnMEpbjRql7JiV7/BIbFYHMgCgAwXta0k2LLvz7qOg%2bGBH/5D2De6WD2RIoYz%2bD7KR18mpnnsFgDH4VLUMTWSgWYNhwgSe2nVLN18xwdHD6jKKZUWVNQzOnG0vUngf%2bRxxJfTZ7Lzcs5GcyPVe%2beIg17ZRroSFRJoCbF2KIvNglGZdnhRAN3Slwf%2bMZdE5rh0ShDEFKKxL9kJCNHD8g4fRUpwjMbMWmcsYS9gx2NbwUbQxjzA5RwjCxi5GaBjqzAoJqdEypjVNmNiUeXu0itxyu/tfN3ZZNl80Pmn%2b4t4si21KAOpYEuzkhMoZcfcV3ouknYHt/OIJ/SbpcQwKz0TARC2NRgYQweTDG91hlEOUSYM3%2blaMugy9/2aArfsvmVaH/JSXo4Rd2gDTFjjF43FyXiMZclzkaeFZePf/KhQr46AZZJ%2blwT1U4sGZlLp/VLzEKlM/riK2lMzKmndt271crRJmChyMHG5jzKJShPd%2bkl9LCTLXgHFT0shYi6v19zoZM%2bwZwPBmujhdf5YIWMq5zOzWBOOFRoOAQv3JSu9qV4HGGtBTCmzoyQaisPQADozJg5NROzGRWX5opQSelGGyhgnKjoMsfaDAWYymcq%2bx/qAMI5TkcvgcxGzD2QmfyZy4ZRrEXAFWRmsf8o0jWxqaXSNA=&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221010T161949Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAXLNPD36HZJPTIIQP/20221010/us-east-1/s3/aws4_request&X-Amz-Signature=0c5ff235261ba0f29aab787ef2fe8cdf73844a915c9a425d26310ed523fd785b)
#### Logged User Home Page
![enter image description here](https://twitter-skimby-bucket.s3.us-east-1.amazonaws.com/Screen%20Shot%202022-10-10%20at%2011.14.59%20AM.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj//////////wEaCXVzLWVhc3QtMiJHMEUCIArHuD%2bmbCPfRfnvlxeMzcO5E7psXOETpUjLdrurprslAiEAwQNQxLjKhLkiS2/5PWEdjtmshGRBybG4MbsSKASyvHUq5AIIYRAAGgw1MDU1NjI3ODM2MzEiDKtEWbVi1WHdvxmyHCrBAp5GYg5RNhODVjxV98SC2SwldXEWItuwJKImDGpNM2JUCp5kTqUkNIk6/u%2bh%2bDjE9ieaBky%2bKuLUuxLz/jhly%2bzlr8SABA98VLqNQJ3%2bBCIpoRMxxMC56DyWJ5ERwReQLZti1NyQko3iP14cFR/xUYrTP86qvLprXz5iyywCYPOMwEy26ljEm7TWwEnMEpbjRql7JiV7/BIbFYHMgCgAwXta0k2LLvz7qOg%2bGBH/5D2De6WD2RIoYz%2bD7KR18mpnnsFgDH4VLUMTWSgWYNhwgSe2nVLN18xwdHD6jKKZUWVNQzOnG0vUngf%2bRxxJfTZ7Lzcs5GcyPVe%2beIg17ZRroSFRJoCbF2KIvNglGZdnhRAN3Slwf%2bMZdE5rh0ShDEFKKxL9kJCNHD8g4fRUpwjMbMWmcsYS9gx2NbwUbQxjzA5RwjCxi5GaBjqzAoJqdEypjVNmNiUeXu0itxyu/tfN3ZZNl80Pmn%2b4t4si21KAOpYEuzkhMoZcfcV3ouknYHt/OIJ/SbpcQwKz0TARC2NRgYQweTDG91hlEOUSYM3%2blaMugy9/2aArfsvmVaH/JSXo4Rd2gDTFjjF43FyXiMZclzkaeFZePf/KhQr46AZZJ%2blwT1U4sGZlLp/VLzEKlM/riK2lMzKmndt271crRJmChyMHG5jzKJShPd%2bkl9LCTLXgHFT0shYi6v19zoZM%2bwZwPBmujhdf5YIWMq5zOzWBOOFRoOAQv3JSu9qV4HGGtBTCmzoyQaisPQADozJg5NROzGRWX5opQSelGGyhgnKjoMsfaDAWYymcq%2bx/qAMI5TkcvgcxGzD2QmfyZy4ZRrEXAFWRmsf8o0jWxqaXSNA=&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221010T162124Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAXLNPD36HZJPTIIQP/20221010/us-east-1/s3/aws4_request&X-Amz-Signature=2aea154495f365e84c56bf2db08c840187b2ad30dc8781c0c24f93ba2e4cc457)
#### User Tweet Creation Form 
![enter image description here](https://twitter-skimby-bucket.s3.us-east-1.amazonaws.com/Screen%20Shot%202022-10-10%20at%2011.23.16%20AM.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj//////////wEaCXVzLWVhc3QtMiJHMEUCIArHuD%2bmbCPfRfnvlxeMzcO5E7psXOETpUjLdrurprslAiEAwQNQxLjKhLkiS2/5PWEdjtmshGRBybG4MbsSKASyvHUq5AIIYRAAGgw1MDU1NjI3ODM2MzEiDKtEWbVi1WHdvxmyHCrBAp5GYg5RNhODVjxV98SC2SwldXEWItuwJKImDGpNM2JUCp5kTqUkNIk6/u%2bh%2bDjE9ieaBky%2bKuLUuxLz/jhly%2bzlr8SABA98VLqNQJ3%2bBCIpoRMxxMC56DyWJ5ERwReQLZti1NyQko3iP14cFR/xUYrTP86qvLprXz5iyywCYPOMwEy26ljEm7TWwEnMEpbjRql7JiV7/BIbFYHMgCgAwXta0k2LLvz7qOg%2bGBH/5D2De6WD2RIoYz%2bD7KR18mpnnsFgDH4VLUMTWSgWYNhwgSe2nVLN18xwdHD6jKKZUWVNQzOnG0vUngf%2bRxxJfTZ7Lzcs5GcyPVe%2beIg17ZRroSFRJoCbF2KIvNglGZdnhRAN3Slwf%2bMZdE5rh0ShDEFKKxL9kJCNHD8g4fRUpwjMbMWmcsYS9gx2NbwUbQxjzA5RwjCxi5GaBjqzAoJqdEypjVNmNiUeXu0itxyu/tfN3ZZNl80Pmn%2b4t4si21KAOpYEuzkhMoZcfcV3ouknYHt/OIJ/SbpcQwKz0TARC2NRgYQweTDG91hlEOUSYM3%2blaMugy9/2aArfsvmVaH/JSXo4Rd2gDTFjjF43FyXiMZclzkaeFZePf/KhQr46AZZJ%2blwT1U4sGZlLp/VLzEKlM/riK2lMzKmndt271crRJmChyMHG5jzKJShPd%2bkl9LCTLXgHFT0shYi6v19zoZM%2bwZwPBmujhdf5YIWMq5zOzWBOOFRoOAQv3JSu9qV4HGGtBTCmzoyQaisPQADozJg5NROzGRWX5opQSelGGyhgnKjoMsfaDAWYymcq%2bx/qAMI5TkcvgcxGzD2QmfyZy4ZRrEXAFWRmsf8o0jWxqaXSNA=&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221010T162350Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAXLNPD36HZJPTIIQP/20221010/us-east-1/s3/aws4_request&X-Amz-Signature=e222cb44396ad3c4c89cbb5cebf91810e464400a589630525d8ed161af6ceb94)
## Features 
#### Primary Features
- Create a new user
- Log In user
- Demo user login
- Create new Tweet, edit, view and delete Tweet
- Create, edit, view and delete a comment on a Tweet
#### Secondary Features 
- Like and unlike a tweet (create and delete)
- Retweet and undo retweet a tweet (create and delete)
- Follow and unfollow a user (create and delete)
#### Site Features 
- A an image or gif to your tweet or comment
- Explore page introduces user to other, unfollowed users
- User page displays the users' tweets, liked tweets and retweets

## Future Implementation
- Add a Search bar to search all users on left panel above recommended Followers

[Original Design Docs](https://github.com/skimby/Twitter-Clone/wiki/Original-Design-Docs)

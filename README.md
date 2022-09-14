# Twitter-Clone
![Database Schema for Twitter Clone ](https://github.com/skimby/Twitter-Clone/blob/main/Twitter-Diagram.png?raw=true)


## `Users`
| Column Name    | Data Type | Details               |
|----------------|-----------|-----------------------|
| id             | integer   | primary key, auto-increment, not null |
| firstName     | string(50)| not null              |
| lastName      | string(50)| not null              |
| email          | string    | not null, unique      |
| username       | string(30)| not null, unique      |
| password       | string    | not null              |
| bio            | string(160)   |                       |
| location  | string    |              |
| website  | url    |             |
| profileImage  | url    |                       |
| coverImage  | string    |            |
| verified  | boolean    | not null              |
| session token  | string    | not null              |
| created_at     | date      | not null              |
| updated_at     | date      | not null              |


## `Tweets`
| Column Name    | Data Type | Details               |
|----------------|-----------|-----------------------|
| id             | integer   | primary key, auto-increment, not null |
| userId     | integer| not null              |
| tweet      | string(280)|       not null        |
| image          | url    |       |
| gif       | url|      |
| retweetId            | integer   |                       |
| created_at     | date      | not null              |
| updated_at     | date      | not null              |


## `Retweets`
| Column Name    | Data Type | Details               |
|----------------|-----------|-----------------------|
| id             | integer   | primary key, auto-increment, not null |
| userId     | integer| not null              |
| tweetId      | integer |       not null        |
| created_at     | date      | not null              |
| updated_at     | date      | not null              |



## `Comments`
| Column Name    | Data Type | Details               |
|----------------|-----------|-----------------------|
| id             | integer   | primary key, auto-increment, not null |
| userId     | integer| not null              |
| tweetId      | integer |       not null        |
| comment          | string(280)    |       |
| image          | url    |       |
| gif       | url|      |
| created_at     | date      | not null              |
| updated_at     | date      | not null              |

 

 ## `Likes`
| Column Name    | Data Type | Details               |
|----------------|-----------|-----------------------|
| id             | integer   | primary key, auto-increment, not null |
| userId     | integer| not null              |
| tweetId      | integer |       not null        |
| created_at     | date      | not null              |
| updated_at     | date      | not null              |


 ## `Follows`
| Column Name    | Data Type | Details               |
|----------------|-----------|-----------------------|
| id             | integer   | primary key, auto-increment, not null |
| userId     | integer| not null              |
| followerId      | integer |       not null        |
| created_at     | date      | not null              |
| updated_at     | date      | not null              |

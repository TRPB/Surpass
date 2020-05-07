Surpass
=======
Secure, unobtrusive, rapid password management


What is Surpass?
-----------------
Surpass is a system for securing your passwords with minimal intrusion to you. You get all the benefits and more of using a complex and difficult to guess password without the hassle of having to remember it! 



How does it work?
-----------------

When using Surpass, your password is transparently transformed into a much more secure password. This is all done behind the scenes in the web browser. You just type your password in like normal!

For instance, if you use the password "1234" and type it into facebook.com, facebook will never see "1234" but it will be sent an encrypted version of it such as "dD;8Q907FMS8". This is far more difficult to guess and has the advantage of you not needing to remember it.

A lot of the high profile password breaches such as the recent one at yahoo have exposed one major problem: People use the same passwords for everything. 

Surpass avoids this problem by using a different password for each site you visit. For example, a weak password of "1234" will be sent to facebook.com as "dD;8Q907FMS8" but using the same password of "1234" on google.com, google would see "oZIIS9MuL85!"

This means that if facebook was hacked and your password stolen, the hacker could never log into your gmail account using your facebook password!

Finally, your password is unique to YOU. By supplying a key for your password, you are making your password truely unique. You must remember your key, but you will not need to type this in every time.

A common trick hackers use once they've stolen a poorly implemented password database is to find people who have the same password. This means they can decrypt one encrypted passwords and find out the password of everyone using it. Surpass protects against this by making your password unique to YOU. Even if someone else is using Surpass and the same unencrypted password as you on the same website as you, the passwords the website sees will be entirely different. 



Goals
-----------------
-To be as simple to use as possible for non-technical users
-Minimal configuration



Why not lastpass or a similar service?
--------------------------------------

While these services are useful, they are a single point of failure.

1. If someone gets your master password, they have access to all your passwords through the lastpass website. 

2. LastPass' servers are a very obvious target for hackers. Of course LastPass don't actually store your passwords, but with your master password (or a flaw in their encryption algorithm, or a good brute force attack) someone could potentially decrypt all your passwords in one go. 

3. If LastPass goes bankrupt, down through DDoS or otherwise out of service, all your passwords are lost or inaccessible.

4. Even if you trust a company 100%, why would you risk giving them all your passwords when there are alternatives?

So how is Surpass different to online services?
-----------------------------------------------

Surpass is a browser extension which computes your password *on the fly*. Your passwords are **never** stored anywhere, even in an encrypted manner.

It uses the following to generate a password on the fly. For example, if you were logging into facebook as `bob@example.org` with the password `secret` 

- Your account name: `bob@example.org`
- The memorable password you type into the facebook.com login page: `secret` as you would before using Surpass.
- The domain name of the site you are logging in to: `faceook.com` 
- Your master password

For someone to get your facebook password, they need to know all this information.

You can still use a relatively insecure password like `secret` as what you type into the password box never leaves your computer. It is, of course, still advisable to use something that's not easily guessable.



The benefits of Surpass
-----------------------

1. The password you type in never leaves your computer

2. Your master password never leaves your computer

3. If one of the sites you use is hacked and your password stolen, hackers will not be able to access your other accounts even if you're typing in the same password

4. You have the security of using a complex, long and very difficult to guess password without the hassle of remembering it.

5. Mostly you don't even need to care that Surpass is even there. You can just carry on as normal safe in the knowledge that your password security is being beefed up behind the scenes. 


What are the drawbacks of using Surpass?
----------------------------------------


1. At the moment, it's only a Browser extension. There will be a web version available where you can supply all the information and generate the passwords if you're ever away from a Chrome browser. 

2. If you forget your key, you will need to reset all your passwords. It's recommended you make your key memorable. It doesn't matter what it is, but you'll need to use it if you ever re-install the extension or install it on another computer.


Your KEY is used to make your passwords truely unique. Someone else may use the same password for the same site. The key is an added part of the password to keep even common passwords unique to to both you and the site they are used on.

The password is also per-site so you can use the same passwords for multiple sites and each site will see it differently. 



FAQ
===

Why use Surpass?
----------------
There have been many cases where poorly stored passwords have been stolen from high profile sites. Monster, Yahoo, Last.fm and they're only becomming more common. Although there's nothing you can do to prevent that, one of the main problems these breeches cause is giving hackers access to many of your services using the hacked password.

People aren't "lazy"
----------------
A common misconception is that people are "Lazy" when they use the same or easy to guess password for everything. On average people have 24 different passwords to remember. It's no wonder people use the same passwords for everything! Trying to remember 24 different passwords is difficult, let alone which one is for which site. That's where Surpass comes in. You can use the same password for everything and Surpass will transparently change it into a unique password 


What passwords are secure?
--------------------------
We're told by experts that dictionary words, repeated letters and anything that humans can easily remember are very easy to guess and insecure. By converting a simple password like "password" into a set of sixteen random characters such as "W6lrEi%;d7$C" which is unique to both that site and YOU, these problems can be avoided.


Can I recover my Key?
---------------------
Unfortunately not. In the interest of security, Surpass never stores your key in plain text and your key never leaves the PC you created it on. You should use something memorable as your key. As you won't be typing it in frequently, you can make it longer than a normal password.





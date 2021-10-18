# ☁ ShareX to Cloudflare Images

A small Worker to make it easy to upload images via ShareX to Cloudflare Images.
Config at the top of the file allows you to set what variants to use.

### Why?
Images is a new product from Cloudflare that allows you to upload images onto their CDN without needing a S3 bucket. It also comes with the ability to setup variants to make it easier for different sizes. Combining ShareX's ease of use with Image's speed and file-size optimizations, you can cut down on your screenshot folder's size pretty nicely.

This does require an active subscription to Images, as well as an API key that can edit images.

### How to setup
You need to publish this Worker to your account by doing `npm run publish`. This will create a Worker that is now ready to upload images.

#### Adding secrets to Wrangler
This Worker relies on 3 secrets, `KEY`, `ACCOUNT_ID`, and `ACCOUNT_TOKEN`. Key is *your* key to access this Worker. The key you will use to add it to your custom destinations or upload directly. `ACCOUNT_ID` is your Cloudflare account ID, and `ACCOUNT_TOKEN` is an API key with the `Cloudflare Images: edit` permission. You can set these by running:
`wrangler secret put KEY/ACCOUNT_ID/ACCOUNT_TOKEN`

#### Adding this Worker to ShareX
![](https://imagedelivery.net/ClicBPYgmKg9AnDnGePOxg/2e5be0bf-b331-4518-a86d-d717e4247100/public)

You need to open up the custom destinations menu by clicking these menu items. Once you have the menu open, you can click `Import by URL`:
![](https://imagedelivery.net/ClicBPYgmKg9AnDnGePOxg/005cd307-6355-499b-3f46-c923d9310600/public)

You type in your Worker url along with `?key=<your-secret-key>`:
![](https://imagedelivery.net/ClicBPYgmKg9AnDnGePOxg/0961a40b-a22d-43fb-cf8b-7abe73662000/public)

Now you should see something like this, if you do, congrats you can now upload straight to images via ShareX!

### How?
While it is possible to directly upload to CF images via ShareX, we use a Worker solution here to allow for an extra layer of security + portability.

### Interest
<img style="width:100%;" src="https://api.constellations.tech/v2/ceru-sharex-uploader-interest/graph/image?resolution=days&range=7&type=sum&mode=area&label=Views&label-color=242424&series=1&key=share_FH53aQF3u18aj876prydFBE4&width=1000&height=300&x=1"/>

<img hidden src="https://api.constellations.tech/v2/ceru-sharex-uploader-interest?key=PuesLcyqnlnN9aqebNzEtRtJfE7KN4fm&image=1" style="display:none;"/>

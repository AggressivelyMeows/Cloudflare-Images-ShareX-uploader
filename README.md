# ☁ ShareX to Cloudflare Images

A small Worker to make it easy to upload images via ShareX to Cloudflare Images.
Config at the top of the file allows you to set what variants to use.

### Why?
Images is a new product from Cloudflare that allows you to upload images onto their CDN without needing a S3 bucket. It also comes with the ability to setup variants to make it easier for different sizes. Combining ShareX's ease of use with Image's speed and file-size optimizations, you can cut down on your screenshot folder's size pretty nicely.

This does require an active subscription to Images, as well as an API key that can edit images.

### How?
While it is possible to directly upload to CF images via ShareX, we use a Worker solution here to allow for an extra layer of security + portability.

### Interest
<img style="width:100%;" src="https://api.constellations.tech/v2/ceru-sharex-uploader-interest/graph/image?resolution=days&range=7&type=sum&mode=area&label=Views&label-color=242424&series=1&key=share_FH53aQF3u18aj876prydFBE4&width=1000&height=300&x=1"/>

<img hidden src="https://api.constellations.tech/v2/ceru-sharex-uploader-interest?key=PuesLcyqnlnN9aqebNzEtRtJfE7KN4fm&image=1" style="display:none;"/>

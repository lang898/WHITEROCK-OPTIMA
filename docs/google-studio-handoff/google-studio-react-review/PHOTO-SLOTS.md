# Photo replacement slots

This review build intentionally includes no product, factory, equipment, application, or project photography.

## Priority owner uploads

1. Homepage brand/product image.
2. One real photo for every SKU in `data/products.json`.
3. Verified material and color samples for `data/colors.json`.
4. Vietnam and Yunfu facility overview photos.
5. Equipment photos matched to the correct process card.
6. Real packing, labeling, crate, A-frame, and loading photos.
7. Application or project photos only when WHITEROCK has permission to publish and the caption identifies their true status.

Product filenames are reserved under `assets/products/`. The UI currently ignores these paths and renders a labeled placeholder. When owner photos are added, update the media component to display `imageType: "photo"` records only.

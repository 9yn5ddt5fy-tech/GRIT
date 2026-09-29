#!/usr/bin/env bash
# Downloads the Figma design images into assets/img/.
# Figma asset links expire about 7 days after they were generated (2026-09-29).
# If they have expired, export the images from Figma again
# (select a layer -> Export -> PNG/SVG) and save them under the same file names.
set -euo pipefail
cd "$(dirname "$0")/assets/img"
BASE="https://www.figma.com/api/mcp/asset"

while read -r name id; do
  [ -z "$name" ] && continue
  echo "-> $name"
  curl -fsSL -o "$name" "$BASE/$id" || echo "   failed: $name"
done <<'LIST'
dash-lines.png        ef9e2179-2bfa-47cb-985d-0aaf9b9cdd4d.png
hero.png              1df332b6-7858-4d28-b76c-c7e0e8adb9f1.png
footer.png            8ba81e22-61be-4f7e-b1ed-be60c3c31dc2.png
edu-cover.png         d832ffe2-caaf-4189-bba5-f3c75197a755.png
badge.png             37cca9ca-2a7e-4b7b-8eab-eb41710902e2.png
env-cover.png         dfd939fd-ed99-4b6b-8197-b83617b23d56.png
where-card.png        405f7feb-efb6-41d9-81a9-e0e75fbbf436.png
podcast.png           851a56d5-a16f-4175-9ce2-1f34625fcfee.png
photo-1.png           729a668c-1bbb-48c3-848c-e1b6169538d1.png
photo-2.png           e8547cf2-db83-442f-b94c-4dd45a8f3040.png
photo-3.png           08cad0fd-1d81-48a3-b524-4eba280f337b.png
photo-4.png           13496139-2d8e-4ca5-92df-e130ee3d7ba6.png
logo.png              8a86bd6d-4675-4f4f-9a1d-b2e5467f21a7.png
member.png            567157a4-fa1d-40ca-a4d4-4ef7fa7839f5.png
nav-bar.svg           074285d0-c9ac-4f08-b58c-258f183f1c65.svg
star-where.svg        9d12c77e-71b8-4bd1-86aa-de91063c5b66.svg
star-completed.svg    41faf292-a0e7-44ed-8ad4-69910b1f64af.svg
map.svg               9b5c0738-316c-4afd-b121-83ba08be1ce1.svg
map-star.svg          9c2b133a-0899-4282-8345-ab515e337344.svg
map-star-ugii.svg     7b314105-105f-46e5-a20b-5b63b92f9968.svg
star-title.svg        a132b904-d7c0-44d9-b4a0-06767f3324fe.svg
nav-photo.png         d57e6eda-7220-4f6c-be90-8cab0737b596.png
dash-lines-2.png      2e9ff37d-7d7b-4254-bd77-465ac6471f24.png
edu-cover-2.png       5dc7c336-0ab8-4d50-a8f6-fc1b870dba00.png
edu-chart.png         e9da6ebf-238a-416d-ac52-4d5d963563b0.png
env-cover-2.png       c213a316-a7c2-4a92-acb8-368a145bd3bf.png
badge-env.png         15700a6e-3137-4345-86cf-726f2dfd6471.png
env-chart.png         2bb262e5-2520-49d3-b0ad-bfa3ad069af8.png
member-portrait.png   ef6acb2d-dee0-4ae0-b6cf-dedc90d9758a.png
member-photo-a.png    66f43531-5bd9-4243-bf97-da5f360e8d79.png
member-photo-b.png    8106fe74-339f-41ce-973f-99cc3d483b98.png
dash-lines-3.png      e2b83d69-ff1c-47e2-a9c2-c25106cd2dd2.png
LIST
echo "Done."

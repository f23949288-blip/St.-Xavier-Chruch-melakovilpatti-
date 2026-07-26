
// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({
alpha:true,
antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);

renderer.domElement.style.position="fixed";
renderer.domElement.style.top="0";
renderer.domElement.style.left="0";
renderer.domElement.style.zIndex="-1";

document.body.appendChild(renderer.domElement);

// Stars
const geometry = new THREE.BufferGeometry();
const vertices=[];

for(let i=0;i<4000;i++){

vertices.push(
(Math.random()-0.5)*200,
(Math.random()-0.5)*200,
(Math.random()-0.5)*200
);

}

geometry.setAttribute(
'position',
new THREE.Float32BufferAttribute(vertices,3)
);

const material=new THREE.PointsMaterial({
color:0xffd700,
size:0.4
});

const stars=new THREE.Points(
geometry,
material
);

scene.add(stars);

// Animation

function animate(){

requestAnimationFrame(animate);

stars.rotation.y+=0.0008;
stars.rotation.x+=0.0002;

renderer.render(scene,camera);

}

animate();

// Resize

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});

// Mouse 3D Effect

const hero = document.querySelector(".hero");

hero.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.pageX)/35;

const y=(window.innerHeight/2-e.pageY)/35;

hero.style.transform=
`rotateY(${x}deg) rotateX(${-y}deg)`;

});

hero.addEventListener("mouseleave",()=>{

hero.style.transform="rotateX(0) rotateY(0)";

});

window.addEventListener("scroll",()=>{

const navbar=document.querySelector(".navbar");

if(window.scrollY>50){

navbar.style.background="rgba(0,0,0,.7)";
navbar.style.backdropFilter="blur(20px)";

}else{

navbar.style.background="rgba(255,255,255,.08)";

}

});
gsap.registerPlugin(ScrollTrigger);

// Hero animation
gsap.from(".hero-content",{
    opacity:0,
    y:100,
    duration:1.5
});

// Gallery cards animation
gsap.utils.toArray(".gallery-card").forEach((card)=>{

    gsap.from(card,{
        scrollTrigger:{
            trigger:card,
            start:"top 85%"
        },
        opacity:0,
        y:80,
        scale:0.8,
        duration:1
    });

});

// Modern 3D Scene with Three.js
// Inspired by Creative Portfolio Template

let scene, camera, renderer, controls;
let heroScene, aboutScene;
let particles = [];
let floatingObjects = [];
let mouseX = 0, mouseY = 0;

// Initialize Three.js scenes
function initThreeScenes() {
    initHeroScene();
    initAboutScene();
    animate();
}

// Hero section 3D scene
function initHeroScene() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // Scene setup
    heroScene = new THREE.Scene();
    heroScene.fog = new THREE.Fog(0x0a0a0a, 1, 1000);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 50);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true, 
        antialias: true 
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    heroScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x6366f1, 1);
    directionalLight.position.set(10, 10, 5);
    heroScene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 1, 100);
    pointLight.position.set(-10, -10, 5);
    heroScene.add(pointLight);

    // Create floating geometries
    createFloatingGeometries();
    
    // Create particle system
    createParticleSystem();

    // Mouse interaction
    document.addEventListener('mousemove', onMouseMove);
    
    // Handle resize
    window.addEventListener('resize', onWindowResize);
}

// About section 3D scene
function initAboutScene() {
    const canvas = document.getElementById('about-canvas');
    if (!canvas) return;

    // Scene setup
    aboutScene = new THREE.Scene();
    aboutScene.fog = new THREE.Fog(0x1a1a1a, 1, 1000);

    // Camera setup
    const aboutCamera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    aboutCamera.position.set(0, 0, 30);

    // Renderer setup
    const aboutRenderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true, 
        antialias: true 
    });
    aboutRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    aboutRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    aboutRenderer.setClearColor(0x000000, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    aboutScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xf59e0b, 1);
    directionalLight.position.set(5, 5, 5);
    aboutScene.add(directionalLight);

    // Create morphing shape
    createMorphingShape(aboutScene, aboutCamera, aboutRenderer);
}

// Create floating geometries
function createFloatingGeometries() {
    const geometries = [
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.SphereGeometry(1.5, 32, 32),
        new THREE.TorusGeometry(1, 0.3, 16, 100),
        new THREE.OctahedronGeometry(1.5),
        new THREE.TetrahedronGeometry(1.5)
    ];

    const materials = [
        new THREE.MeshPhongMaterial({ 
            color: 0x6366f1, 
            transparent: true, 
            opacity: 0.8,
            wireframe: true 
        }),
        new THREE.MeshPhongMaterial({ 
            color: 0x06b6d4, 
            transparent: true, 
            opacity: 0.6,
            wireframe: true 
        }),
        new THREE.MeshPhongMaterial({ 
            color: 0xf59e0b, 
            transparent: true, 
            opacity: 0.7,
            wireframe: true 
        }),
        new THREE.MeshPhongMaterial({ 
            color: 0x10b981, 
            transparent: true, 
            opacity: 0.8,
            wireframe: true 
        }),
        new THREE.MeshPhongMaterial({ 
            color: 0xef4444, 
            transparent: true, 
            opacity: 0.6,
            wireframe: true 
        })
    ];

    for (let i = 0; i < 15; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = materials[Math.floor(Math.random() * materials.length)];
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100
        );

        mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        mesh.userData = {
            originalY: mesh.position.y,
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            },
            floatSpeed: Math.random() * 0.01 + 0.005
        };

        floatingObjects.push(mesh);
        heroScene.add(mesh);
    }
}

// Create particle system
function createParticleSystem() {
    const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 200;
        positions[i + 1] = (Math.random() - 0.5) * 200;
        positions[i + 2] = (Math.random() - 0.5) * 200;

            const color = new THREE.Color();
        color.setHSL(Math.random() * 0.3 + 0.5, 0.8, 0.6);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    heroScene.add(particleSystem);
    particles.push(particleSystem);
}

// Create morphing shape for about section
function createMorphingShape(scene, camera, renderer) {
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.3,
        wireframe: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animate morphing
    let time = 0;
    function animateMorph() {
        time += 0.01;
        
        // Morph the geometry
        const positions = geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];
            
            const noise = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * Math.sin(z * 0.5 + time);
            const scale = 1 + noise * 0.3;
            
            positions[i] = x * scale;
            positions[i + 1] = y * scale;
            positions[i + 2] = z * scale;
        }
        
        geometry.attributes.position.needsUpdate = true;
        
        // Rotate
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        
        renderer.render(scene, camera);
        requestAnimationFrame(animateMorph);
    }
    
    animateMorph();
}

// Mouse move handler
function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Window resize handler
function onWindowResize() {
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update floating objects
    floatingObjects.forEach(obj => {
        // Rotate
        obj.rotation.x += obj.userData.rotationSpeed.x;
        obj.rotation.y += obj.userData.rotationSpeed.y;
        obj.rotation.z += obj.userData.rotationSpeed.z;

        // Float
        obj.position.y = obj.userData.originalY + Math.sin(Date.now() * obj.userData.floatSpeed) * 5;

        // Mouse interaction
        obj.position.x += (mouseX * 10 - obj.position.x) * 0.01;
        obj.position.z += (mouseY * 10 - obj.position.z) * 0.01;
    });

    // Update particles
    particles.forEach(particleSystem => {
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
            positions[i] -= 0.5;
            if (positions[i] < -100) {
                positions[i] = 100;
            }
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
    });

    // Render
    if (renderer && heroScene && camera) {
        renderer.render(heroScene, camera);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Three.js to load
    if (typeof THREE !== 'undefined') {
        initThreeScenes();
    } else {
        // Fallback if Three.js is not loaded
        console.warn('Three.js not loaded, skipping 3D effects');
    }
});

// Utility functions
function createWaveGeometry(width, height, segments) {
    const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
    const positions = geometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2;
    }
    
    geometry.attributes.position.needsUpdate = true;
    return geometry;
}

function createRippleEffect(x, y) {
    const rippleGeometry = new THREE.RingGeometry(0, 2, 32);
    const rippleMaterial = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
            transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
    });
    
    const ripple = new THREE.Mesh(rippleGeometry, rippleMaterial);
    ripple.position.set(x, y, 0);
    heroScene.add(ripple);
    
    // Animate ripple
    gsap.to(ripple.scale, {
        x: 10,
        y: 10,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
            heroScene.remove(ripple);
        }
    });
    
    gsap.to(rippleMaterial, {
        opacity: 0,
        duration: 2,
        ease: "power2.out"
    });
}

// Export functions
window.ThreeScene = {
    initThreeScenes,
    createRippleEffect,
    animate
};

// Three.js Scene Manager
class ThreeSceneManager {
    constructor() {
        this.scenes = {};
        this.init();
    }

    init() {
        // Initialize 3D scenes for each section
        this.createHeroScene();
        this.createAboutScene();
        this.createSkillsScene();
        this.createProjectsScene();
        this.createContactScene();
        
        // Start animation loop
        this.animate();
    }

    createHeroScene() {
        const container = document.getElementById('hero-3d-container');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create floating geometric shapes
        const shapes = [];
        const geometryTypes = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(0.5, 32, 32),
            new THREE.TorusGeometry(0.5, 0.2, 16, 100),
            new THREE.OctahedronGeometry(0.5)
        ];

        for (let i = 0; i < 15; i++) {
            const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
            const material = new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
                transparent: true,
                opacity: 0.8,
                wireframe: Math.random() > 0.5
            });
            
            const shape = new THREE.Mesh(geometry, material);
            shape.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            shape.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            scene.add(shape);
            shapes.push(shape);
        }

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);

        camera.position.z = 15;

        this.scenes.hero = { scene, camera, renderer, shapes };
    }

    createAboutScene() {
        const container = document.getElementById('about-3d-container');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create DNA helix
        const dnaGroup = new THREE.Group();
        const helixRadius = 3;
        const helixHeight = 10;
        const segments = 50;

        for (let i = 0; i < segments; i++) {
            const angle = (i / segments) * Math.PI * 4;
            const height = (i / segments) * helixHeight - helixHeight / 2;
            
            const geometry = new THREE.SphereGeometry(0.1, 8, 8);
            const material = new THREE.MeshPhongMaterial({
                color: i % 2 === 0 ? 0x00ff88 : 0xff0088,
                transparent: true,
                opacity: 0.8
            });
            
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(
                Math.cos(angle) * helixRadius,
                height,
                Math.sin(angle) * helixRadius
            );
            
            dnaGroup.add(sphere);
        }

        scene.add(dnaGroup);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(0, 0, 10);
        scene.add(pointLight);

        camera.position.z = 15;

        this.scenes.about = { scene, camera, renderer, dnaGroup };
    }

    createSkillsScene() {
        const container = document.getElementById('skills-3d-container');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create skill cubes
        const skillCubes = [];
        const skills = ['HTML', 'CSS', 'JS', 'React', 'Node', 'Python', 'PHP', 'MySQL'];
        const colors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0x96ceb4, 0xfeca57, 0xff9ff3, 0x54a0ff, 0x5f27cd];

        skills.forEach((skill, index) => {
            const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
            const material = new THREE.MeshPhongMaterial({
                color: colors[index],
            transparent: true,
                opacity: 0.8
            });
            
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(
                (index % 4 - 1.5) * 3,
                Math.floor(index / 4) * 3 - 1.5,
                0
            );
            
            scene.add(cube);
            skillCubes.push(cube);
        });

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        camera.position.z = 15;

        this.scenes.skills = { scene, camera, renderer, skillCubes };
    }

    createProjectsScene() {
        const container = document.getElementById('projects-3d-container');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create project platforms
        const platforms = [];
        for (let i = 0; i < 6; i++) {
            const geometry = new THREE.BoxGeometry(4, 0.2, 3);
            const material = new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(i / 6, 0.7, 0.5),
                transparent: true,
                opacity: 0.8
            });
            
            const platform = new THREE.Mesh(geometry, material);
            platform.position.set(
                (i % 3 - 1) * 6,
                Math.floor(i / 3) * 4 - 2,
                0
            );
            
            scene.add(platform);
            platforms.push(platform);
        }

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);

        camera.position.z = 15;

        this.scenes.projects = { scene, camera, renderer, platforms };
    }

    createContactScene() {
        const container = document.getElementById('contact-3d-container');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create communication nodes
        const nodes = [];
        for (let i = 0; i < 8; i++) {
            const geometry = new THREE.SphereGeometry(0.3, 16, 16);
            const material = new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(i / 8, 0.8, 0.6),
                transparent: true,
                opacity: 0.9
            });
            
            const node = new THREE.Mesh(geometry, material);
            node.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
            
            scene.add(node);
            nodes.push(node);
        }

        // Add connecting lines
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    nodes[i].position,
                    nodes[j].position
                ]);
                const line = new THREE.Line(geometry, lineMaterial);
                scene.add(line);
            }
        }

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(0, 0, 10);
        scene.add(pointLight);

        camera.position.z = 15;

        this.scenes.contact = { scene, camera, renderer, nodes };
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Animate hero scene
        if (this.scenes.hero) {
            this.scenes.hero.shapes.forEach((shape, index) => {
                shape.rotation.x += 0.01;
                shape.rotation.y += 0.01;
                shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
            });
            this.scenes.hero.renderer.render(this.scenes.hero.scene, this.scenes.hero.camera);
        }

        // Animate about scene
        if (this.scenes.about) {
            this.scenes.about.dnaGroup.rotation.y += 0.005;
            this.scenes.about.renderer.render(this.scenes.about.scene, this.scenes.about.camera);
        }

        // Animate skills scene
        if (this.scenes.skills) {
            this.scenes.skills.skillCubes.forEach((cube, index) => {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.005;
            });
            this.scenes.skills.renderer.render(this.scenes.skills.scene, this.scenes.skills.camera);
        }

        // Animate projects scene
        if (this.scenes.projects) {
            this.scenes.projects.platforms.forEach((platform, index) => {
                platform.rotation.y += 0.005;
                platform.position.y += Math.sin(Date.now() * 0.001 + index) * 0.003;
            });
            this.scenes.projects.renderer.render(this.scenes.projects.scene, this.scenes.projects.camera);
        }

        // Animate contact scene
        if (this.scenes.contact) {
            this.scenes.contact.nodes.forEach((node, index) => {
                node.rotation.x += 0.01;
                node.rotation.y += 0.01;
                node.position.x += Math.sin(Date.now() * 0.001 + index) * 0.01;
                node.position.y += Math.cos(Date.now() * 0.001 + index) * 0.01;
            });
            this.scenes.contact.renderer.render(this.scenes.contact.scene, this.scenes.contact.camera);
        }
    }
}

// Initialize 3D scenes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThreeSceneManager();
}); 
"use client";
import React, { useEffect, useRef } from 'react';

const MeteorBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // --- Configuration ---
        const STAR_COUNT = 30; // Number of active meteors
        const LAYERS = [
            // Blue-Purplish Palette (Vibrant, fading to same color)
            { speed: 0.2, scale: 0.5, rgb: '120, 119, 255', alpha: 0.4 },  // Soft Indigo
            { speed: 0.5, scale: 0.8, rgb: '100, 100, 255', alpha: 0.7 },  // Mid Blue-Purple
            { speed: 1.2, scale: 1.0, rgb: '80, 80, 255', alpha: 1.0 }     // Bright Electric Blue-Purple
        ];

        let meteors = [];

        // Handle Window Resize
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initMeteors();
        };

        // --- Meteor Class ---
        class Meteor {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                // 1. Assign random layer properties
                const layerIdx = Math.floor(Math.random() * LAYERS.length);
                this.layer = LAYERS[layerIdx];

                // 2. Determine Spawn Position
                if (initial) {
                    // Spread randomly across screen on load
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                } else {
                    // Spawn off-screen (top-right or right side) to drift in
                    const spread = Math.random();
                    if (spread > 0.5) {
                        this.x = Math.random() * canvas.width * 1.5 - canvas.width * 0.2;
                        this.y = -100;
                    } else {
                        this.x = canvas.width + 100;
                        this.y = Math.random() * canvas.height;
                    }
                }

                // 3. Randomize physical properties
                this.len = Math.random() * 200 + 100; // Trail length
                this.speed = (Math.random() * 2 + 1) * this.layer.speed;
            }

            update() {
                // Move diagonally (down-left)
                this.x -= this.speed;
                this.y += this.speed;

                // Reset if it goes off-screen
                if (this.y > canvas.height + 100 || this.x < -200) {
                    this.reset();
                }
            }

            draw(ctx) {
                // Draw Trail (Gradient Fade)
                ctx.beginPath();
                const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.len, this.y - this.len);
                // Fade from full color to same color but 0 opacity (avoids grey transition)
                gradient.addColorStop(0, `rgba(${this.layer.rgb}, ${this.layer.alpha})`);
                gradient.addColorStop(1, `rgba(${this.layer.rgb}, 0)`);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = this.layer.scale * 1.5;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.len, this.y - this.len);
                ctx.stroke();

                // Draw Head (Glowing Dot)
                ctx.beginPath();
                ctx.fillStyle = `rgba(${this.layer.rgb}, ${this.layer.alpha})`;
                ctx.arc(this.x, this.y, this.layer.scale, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize Meteor Array
        const initMeteors = () => {
            meteors = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                meteors.push(new Meteor());
            }
        };

        // Animation Loop
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            meteors.forEach(meteor => {
                meteor.update();
                meteor.draw(ctx);
            });
            animationFrameId = requestAnimationFrame(render);
        };

        // Start
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        render();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0, // Changed to 0 to sit above body background
                pointerEvents: 'none' // Ensure clicks pass through
            }}
        />
    );
};

export default MeteorBackground;

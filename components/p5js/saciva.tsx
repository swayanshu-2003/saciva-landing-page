"use client";

// p5js/Saciva.tsx
import p5 from "p5";
import { useEffect, useRef } from "react";
import SacivaVector from "@/assets/Vector.png";

const Sacivap5js = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sketch = (p: p5) => {
        let particles: Particle[] = [];
        const num = 2000;
        const noiseScale = 500;
        const noiseStrength = 1;

        class Particle {
          loc: p5.Vector;
          dir: p5.Vector;
          speed: number;

          constructor(_loc: p5.Vector, _dir: p5.Vector, _speed: number) {
            this.loc = _loc;
            this.dir = _dir;
            this.speed = _speed;
          }

          run() {
            this.move();
            this.checkEdges();
            this.update();
          }

          move() {
            const angle =
              p.noise(
                this.loc.x / noiseScale,
                this.loc.y / noiseScale,
                p.frameCount / noiseScale
              ) *
              p.TWO_PI *
              noiseStrength;
            this.dir.x = p.cos(angle);
            this.dir.y = p.sin(angle);
            const vel = this.dir.copy();
            vel.mult(this.speed);
            this.loc.add(vel);
          }

          checkEdges() {
            if (
              this.loc.x < 0 ||
              this.loc.x > p.width ||
              this.loc.y < 0 ||
              this.loc.y > p.height
            ) {
              this.loc.x = p.random(p.width * 1.2);
              this.loc.y = p.random(p.height);
            }
          }

          update() {
            p.fill(120, 81, 169);
            p.ellipse(this.loc.x, this.loc.y, this.loc.z);
          }
        }

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          p.noStroke();
          for (let i = 0; i < num; i++) {
            const loc = p.createVector(
              p.random(p.width * 1.2),
              p.random(p.height),
              2
            );
            const dir = p.createVector(1, 0);
            const speed = p.random(0.5, 2);
            particles.push(new Particle(loc, dir, speed));
          }
        };

        p.draw = () => {
          p.fill(0, 10);
          p.rect(0, 0, p.width, p.height);
          particles.forEach((particle) => particle.run());
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
      };

      const p5Instance = new p5(sketch, sketchRef.current!);
      return () => {
        p5Instance.remove();
      };
    }
  }, []);

  return (
    <>
      <div className="relative flex justify-center items-center h-full w-full p-3">
        <div ref={sketchRef} className="absolute inset-0 w-[90%] h-full"></div>
        <img src={SacivaVector?.src} alt="" className="w-full z-40 scale-110" />
      </div>
    </>
  );
};

export default Sacivap5js;

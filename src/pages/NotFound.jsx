import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Terminal, ShieldAlert } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export const NotFound = () => {
  return (
    <div className="bg-bg min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blur */}
      <div className="absolute w-[500px] h-[500px] bg-danger/5 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md text-center"
      >
        <Card className="p-8 border-danger/20 shadow-[0_0_30px_rgba(239,68,68,0.05)]">
          <div className="w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center mx-auto mb-4 border border-danger/20">
            <ShieldAlert size={24} />
          </div>

          <h2 className="text-4xl font-extrabold text-text-primary tracking-tight font-mono">404</h2>
          <span className="text-[10px] text-danger uppercase font-bold tracking-widest font-mono mt-1 inline-block">
            Compilation Error: Page Not Found
          </span>

          <div className="my-6 p-4 bg-zinc-950/60 rounded-lg text-left text-xs font-mono text-text-secondary border border-border/60">
            <div className="text-danger">// Path validation fail</div>
            <div><span className="text-accent">const</span> <span className="text-text-primary">routeStatus</span> = getRoute(window.location.pathname);</div>
            <div className="text-danger">throw new RouteNotFoundError(404);</div>
          </div>

          <p className="text-xs text-text-secondary font-light max-w-xs mx-auto mb-6 leading-relaxed">
            The page directory you are attempting to compile does not exist or has been shifted.
          </p>

          <Link to="/" className="w-full inline-block">
            <Button className="w-full font-semibold flex items-center justify-center gap-1.5 py-2.5">
              <ArrowLeft size={14} /> Return to Dashboard
            </Button>
          </Link>
        </Card>
      </motion.div>
    </div>
  );
};
export default NotFound;

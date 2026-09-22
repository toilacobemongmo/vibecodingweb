import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-destructive/20 bg-destructive/5 my-6">
          <div className="h-14 w-14 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Đã có sự cố hiển thị dữ liệu y tế
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mb-6">
            {this.state.error?.message || "Hệ thống gặp lỗi không mong muốn khi tải thành phần này. Dữ liệu của bạn vẫn an toàn."}
          </p>
          <Button onClick={this.handleReset} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Thử tải lại trang
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

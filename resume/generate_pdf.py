import os
import subprocess
import sys

def main():
    print("--- Professional Resume PDF Generation ---")
    
    # Paths definition
    base_dir = r"c:\Users\Kiran\Portfolio\resume"
    html_path = os.path.join(base_dir, "resume.html")
    pdf_path = os.path.join(base_dir, "Kiran_Kumar_Pradhan_Resume.pdf")
    
    # Executable definition
    edge_executable = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    
    if not os.path.exists(html_path):
        print(f"Error: HTML resume template not found at {html_path}")
        sys.exit(1)
        
    if not os.path.exists(edge_executable):
        print(f"Error: Microsoft Edge not found at expected path: {edge_executable}")
        sys.exit(1)
        
    print(f"HTML Source: {html_path}")
    print(f"Output PDF target: {pdf_path}")
    print(f"Using Microsoft Edge: {edge_executable}")
    
    # Edge print CLI command
    # --headless: run without GUI
    # --disable-gpu: avoid GPU-related warning logs
    # --no-margins: match print css custom padding/margins
    # --print-to-pdf: target path for pdf output
    command = [
        edge_executable,
        "--headless",
        "--disable-gpu",
        f"--print-to-pdf={pdf_path}",
        "--no-margins",
        html_path
    ]
    
    print("Running Edge print process...")
    try:
        result = subprocess.run(command, capture_output=True, text=True, check=True)
        print("Edge command completed.")
        
        # Verify PDF creation
        if os.path.exists(pdf_path) and os.path.getsize(pdf_path) > 0:
            size_kb = os.path.getsize(pdf_path) / 1024
            print(f"SUCCESS: Resume generated successfully at:")
            print(f" -> {pdf_path}")
            print(f"File size: {size_kb:.2f} KB")
        else:
            print("ERROR: PDF was not created or file size is 0 bytes.")
            sys.exit(1)
            
    except subprocess.CalledProcessError as e:
        print("ERROR: Edge print execution failed!")
        print(f"Exit code: {e.returncode}")
        print(f"Stdout:\n{e.stdout}")
        print(f"Stderr:\n{e.stderr}")
        sys.exit(1)
    except Exception as e:
        print(f"ERROR: An unexpected error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

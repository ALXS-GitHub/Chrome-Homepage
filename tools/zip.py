import zipfile
import os
import sys

def zip_build_folder(build_path, zip_file_name):
    """
    Zips the contents of the build folder into a zip file.

    Args:
        build_path (str): The path to the build folder.
        zip_file_name (str): The name of the zip file to create.
    """
    with zipfile.ZipFile(zip_file_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(build_path):
            for file in files:
                file_path = os.path.join(root, file)
                zipf.write(file_path, os.path.relpath(file_path, build_path))

if __name__ == "__main__":
    os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), "../chrome-homepage"))
    build_path = "build"  # Replace with the actual path to your build folder if it's different
    zip_file_name = "build.zip"
    zip_build_folder(build_path, zip_file_name)
    print(f"Successfully created {zip_file_name} from {build_path}")
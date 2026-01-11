import os

class Config:
    # Security
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-please-change'
    
    # Database - handle both local and production
    basedir = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'instance', 'attendance.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Department Configuration
    DEPARTMENT = 'CS Department'
    DIVISIONS = ['A', 'B', 'C', 'D', 'E', 'F']
    SUBJECTS = ['OSY', 'CLC', 'STE', 'ITR', 'SPI', 'LAB']
    STUDENTS_PER_DIVISION = 40
    SESSIONS_PER_DAY = 6
    
    # Attendance Threshold
    LOW_ATTENDANCE_THRESHOLD = 75.0